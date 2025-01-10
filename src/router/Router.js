import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useInRouterContext,
} from "react-router-dom";

import consts from "../libs/consts";
import * as APIS from "../utils/service";
import { API_URL } from "../libs/apiUrl";

import Main from "../page/Main";
import Info from "../page/Info";
import Login from "../page/users/Login";
import Registe from "../page/users/Registe";
import FindPass from "../page/users/FindPass";
import IdCard from "../page/IdCard";
import MyInfo from "../page/my/MyInfo";
import ChangePhone from "../page/my/ChangePhone";
import ChangeAddress from "../page/my/ChangeAddress";
import AdminCards from "../page/cardAdmin/AdminCards";
import AddAdminCard from "../page/company/AddAdminCard";
import CompanyInfo from "../page/company/CompanyInfo";
import CompanyMember from "../page/company/CompanyMember";
import CompanyLink from "../page/company/CompanyLink";
import CompanyEdit from "../page/company/CompanyEdit";
import CompanySetting from "../page/company/CompanySetting";
import ApplicantCards from "../page/cardApplicant/ApplicantCards";
import StaffCards from "../page/cardStaff/StaffCards";
import ApplicantInfo from "../page/cardApplicant/ApplicantInfo";
import Recommend from "../page/cardApplicant/Recommend";
import Relation from "../page/cardApplicant/Relation";
import Track from "../page/track/Track";
import TrackInfo from "../page/track/TrackInfo";
import InBox from "../page/inbox/InBox";
import SubmitInfo from "../page/submit/SubmitInfo";
import SumitSelect from "../page/submit/SumitSelect";
import InBoxEval from "../page/inbox/InBoxEval";
import InBoxEvalRecommend from "../page/inbox/InBoxEvalRecommend";
import Search from "../page/Search";
import Alarm from "../page/Alarm";
import SearchResult from "../page/SearchResult";
import RequestInsa from "../page/RequestInsa";
import RequestRecommend from "../page/RequestRecommend";
import SearchResultCompany from "../page/SearchResultCompany";
import Setting from "../page/setting/Setting";
import ChangePass from "../page/setting/ChangePass";
import DeleteAccount from "../page/setting/DeleteAccount";
import Notice from "../page/setting/Notice";
import Questions from "../page/setting/Questions";
import MyQuestion from "../page/setting/MyQuestion";
import Term from "../page/setting/Term";
import MyQuestionInfo from "../page/setting/MyQuestionInfo";
import Guide from "../page/Guide/Guide";
import RequestMember from "../page/search/RequestMember";
import DocumentView from "../page/company/DocumentView";
import DocumentEdit from "../page/company/DocumentEdit";

function Routerlist() {
  const location = useInRouterContext();

  // const { token } = useSelector(selectUserInfo);
  const token = window.localStorage.getItem("token");

  return (
    <Routes>
      <Route exact path={"/"} element={<Main />} />
      {!token && (
        <>
          <Route exact path={"/info"} element={<Info />} />
          <Route exact path={"/login"} element={<Login />} />
          <Route exact path={"/registe"} element={<Registe />} />
          <Route exact path={"/findpass"} element={<FindPass />} />
        </>
      )}

      {token && (
        <>
          <Route exact path={"/search"} element={<Search />} />
          <Route exact path={"/requestMember"} element={<RequestMember />} />
          <Route exact path={"/searchResult"} element={<SearchResult />} />
          <Route exact path={"/requestInsa"} element={<RequestInsa />} />
          <Route
            exact
            path={"/requestRecommend"}
            element={<RequestRecommend />}
          />
          <Route
            exact
            path={"/searchResultCompany"}
            element={<SearchResultCompany />}
          />

          <Route exact path={"/alarm"} element={<Alarm />} />

          <Route exact path={"/home"} element={<IdCard />} />

          <Route exact path={"/myInfo"} element={<MyInfo />} />
          <Route exact path={"/changePhone"} element={<ChangePhone />} />
          <Route exact path={"/changeAddress"} element={<ChangeAddress />} />

          <Route exact path={"/addAdminCard"} element={<AddAdminCard />} />

          <Route exact path={"/campanyInfo"} element={<CompanyInfo />} />
          <Route exact path={"/campanyEdit"} element={<CompanyEdit />} />
          <Route exact path={"/companyMember"} element={<CompanyMember />} />
          <Route exact path={"/companyLink"} element={<CompanyLink />} />
          <Route exact path={"/companySetting"} element={<CompanySetting />} />

          <Route exact path={"/document"} element={<DocumentView />} />
          <Route exact path={"/documentEdit"} element={<DocumentEdit />} />

          <Route exact path={"/adminCards"} element={<AdminCards />} />
          <Route exact path={"/staffCard"} element={<StaffCards />} />
          <Route exact path={"/applicantCards"} element={<ApplicantCards />} />

          <Route exact path={"/applicantInfo"} element={<ApplicantInfo />} />
          <Route exact path={"/recommend"} element={<Recommend />} />
          <Route exact path={"/relation"} element={<Relation />} />

          <Route exact path={"/track"} element={<Track />} />
          <Route exact path={"/trackInfo"} element={<TrackInfo />} />

          <Route exact path={"/inbox"} element={<InBox />} />
          <Route exact path={"/inboxEval"} element={<InBoxEval />} />
          <Route
            exact
            path={"/inboxEvalRecommed"}
            element={<InBoxEvalRecommend />}
          />

          <Route exact path={"/submitInfo"} element={<SubmitInfo />} />
          <Route exact path={"/submitSelect"} element={<SumitSelect />} />

          <Route exact path={"/setting"} element={<Setting />} />
          <Route exact path={"/changePass"} element={<ChangePass />} />
          <Route exact path={"/delAccount"} element={<DeleteAccount />} />
          <Route exact path={"/notice"} element={<Notice />} />
          <Route exact path={"/faq"} element={<Questions />} />
          <Route exact path={"/myQuestions"} element={<MyQuestion />} />
          <Route exact path={"/myQuestionInfo"} element={<MyQuestionInfo />} />
          <Route exact path={"/term"} element={<Term />} />

          <Route exact path={"/guide"} element={<Guide />} />
        </>
      )}

      <Route exact path={"*"} element={<Main />} />
    </Routes>
  );
}

export default Routerlist;
