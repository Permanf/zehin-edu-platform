import { lazy } from "react";

const HomePage = lazy(() => import("./pages/index"));
const TestsPage = lazy(() => import("./pages/tests/index"));
const TestsSlugPage = lazy(() => import("./pages/tests/slug/index"));
const QuestionSlugPage = lazy(() => import("./pages/questions/slug/index"));
const ResultPage = lazy(() => import("./pages/result/index"));
const UserTestsPage = lazy(() => import("./pages/user-tests/index"));
const UserExamHistory = lazy(() => import("./pages/user-tests/slug/index"));


export const routes_app = [
    {
      path: "/",
      exact: true,
      name: "Home page",
      element: HomePage,
    },
    {
      path: "/tests",
      exact: true,
      name: "Tests page",
      element: TestsPage,
    },
    {
      path: "/tests/:id",
      exact: true,
      name: "Tests id page",
      element: TestsSlugPage,
    },
    {
      path: "/questions/:id",
      exact: true,
      name: "Question id page",
      element: QuestionSlugPage,
    },
    {
      path: "/result",
      exact: true,
      name: "Result page",
      element: ResultPage,
    },
    {
      path: "/user-tests",
      exact: true,
      name: "User Test page",
      element: UserTestsPage,
    },
    {
      path: "/user-tests/:id",
      exact: true,
      name: "User Test page",
      element: UserExamHistory,
    },
  ];