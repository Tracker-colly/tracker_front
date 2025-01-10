import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import CryptoJS from "crypto-js";
import consts from "../libs/consts"
import * as APIS from "../utils/service"

const SECURE_LOCAL_STORAGE_HASH_KEY = "TRACKER__STORAGE__HASHKEY__865958475";

const EncryptedStorage = {
    getItem(key) {
        const value = localStorage.getItem(key);

        if (value) {
            const decryptedBytes = CryptoJS.AES.decrypt(value, SECURE_LOCAL_STORAGE_HASH_KEY)
            const decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);
            return decryptedValue
        }

        return value
    },
    setItem(key, value) {
        const encrypted = CryptoJS.AES.encrypt(value, SECURE_LOCAL_STORAGE_HASH_KEY).toString()
        localStorage.setItem(key, encrypted);
    },
    removeItem(key) {
        localStorage.removeItem(key);
    }
}


export const useUser = create(
    persist(
        (set, get) => ({
            userInfo: null,
            setUser: (state) => {
                set({ "userInfo": state });
            },
            loadUser: (state) => {
                APIS.postData("/v1/user/info").then((result) => {
                    set({ "userInfo": { ...result.data } });
                })
            }
        }),
        {
            name: 'u', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => EncryptedStorage), // (optional) by default, 'localStorage' is used
        }
    )
)

export const useConfig = create((set, get) => ({
    config: {},
    setConfig: (payload) => {
        set({ config: payload })
    },
    codeToText: (payload) => {
        let findData = get().config.codes?.find(v => {
            return v.id == payload
        });
        if (findData) {
            return findData.value
        } else {
            return payload
        }
    }
}))

export const useFooter = create((set, get) => ({
    footerInfo: {},
    setFooterInfo: (payload) => {
        set({ footerInfo: payload })
    },
}))

export const useInboxCount = create((set, get) => ({
    inboxView: false,
    setInBoxView: (payload) => {
        set({ inboxView: payload })
    }
}))

export const useLoading = create((set, get) => ({
    isLoading: false,
    setLoading: (payload) => {
        set({ isLoading: payload })
    }
}))

export const useCompany = create((set, get) => ({
    companyList: [],
    setCompanyList: (payload) => {
        set({ companyList: payload })
    }
}))

export const useInbox = create((set, get) => ({
    inboxTabIndex: 0,  // 0 = admin , 1=member
    setInboxTabIndex: (payload) => {
        set({ inboxTabIndex: payload })
    }
}))

export const usePopup = create(
    persist(
        (set, get) => ({
            regiOpen: true,
            infoOpen: true,
            welcomOpen: true,
            serviceOpen: false,
            profileOpen: true,

            setRegiOpen: (payload) => {
                set({ regiOpen: payload })
            },
            setInfoOpen: (payload) => {
                set({ infoOpen: payload })
            },
            setWelcomOpen: (payload) => {
                set({ welcomOpen: payload })
            },
            setServiceOpen: (payload) => {
                set({ serviceOpen: payload })
            },
            setProfileOpen: (payload) => {
                set({ profileOpen: payload })
            }
        }),
        {
            name: "tc_pu"
        }
    )
)

