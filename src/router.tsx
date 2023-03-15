import { SidebarElement } from "./types/sidebar";
import { createBrowserRouter } from "react-router-dom";
import { Router as RemixRouter } from "@remix-run/router/dist/router";
import GeneralLayout from "./layout/GeneralLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageA from "./pages/PageA";
import PageB from "./pages/PageB";
import PageC from "./pages/PageC";

interface RouterElement {
  id: number; // 페이지 아이디 (반복문용 고유값)
  path: string; // 페이지 경로
  label: string; // 사이드바에 표시할 페이지 이름
  element: React.ReactNode; // 페이지 엘리먼트
  withAuth?: boolean; // 인증이 필요한 페이지 여부
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: "/",
    label: "Home",
    element: <Home />,
    withAuth: false,
  },
  {
    id: 1,
    path: "/page-a",
    label: "PageA",
    element: <PageA />,
    withAuth: true,
  },
  {
    id: 2,
    path: "/page-b",
    label: "PageB",
    element: <PageB />,
    withAuth: true,
  },
  {
    id: 3,
    path: "/page-c",
    label: "PageC",
    element: <PageC />,
    withAuth: true,
  },
  {
    id: 4,
    path: "/login",
    label: "Login",
    element: <Login />,
    withAuth: false,
  },
];

// GeneralLayou에는 페이지 컴포넌트를 children으로 전달
export const routers: RemixRouter = createBrowserRouter(
  routerData.map((router) => {
    if (router.withAuth) {
      return {
        path: router.path,
        element: <GeneralLayout>{router.element}</GeneralLayout>,
      };
    } else {
      return {
        path: router.path,
        element: router.element,
      };
    }
  })
);

// id, path, label을 전달하여 Sidebar에서 사용
export const SidebarContent: SidebarElement[] = routerData.reduce(
  (prev, router) => {
    if (!router.withAuth) return prev;

    return [
      ...prev,
      {
        id: router.id,
        path: router.path,
        label: router.label,
      },
    ];
  },
  [] as SidebarElement[]
);
