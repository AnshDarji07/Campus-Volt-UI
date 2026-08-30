import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { HomePage } from "./components/HomePage";
import { Dashboard } from "./components/Dashboard";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "dashboard", Component: Dashboard },
      { path: "about", Component: AboutPage },
      { path: "contact", Component: ContactPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
