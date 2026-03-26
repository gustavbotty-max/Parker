import { createBrowserRouter } from "react-router";
import { DeckLayout } from "./components/DeckLayout";
import { CoverSlide } from "./components/slides/CoverSlide";
import { MissionSlide } from "./components/slides/MissionSlide";
import { ProblemSlide } from "./components/slides/ProblemSlide";
import { WhyChurchesSlide } from "./components/slides/WhyChurchesSlide";
import { ProductSlide } from "./components/slides/ProductSlide";
import { TapConnectSlide } from "./components/slides/TapConnectSlide";
import { GivingPageSlide } from "./components/slides/GivingPageSlide";
import { WhyDifferentSlide } from "./components/slides/WhyDifferentSlide";
import { LocalFirstSlide } from "./components/slides/LocalFirstSlide";
import { NextStepSlide } from "./components/slides/NextStepSlide";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DeckLayout,
    children: [
      { index: true, Component: CoverSlide },
      { path: "mission", Component: MissionSlide },
      { path: "problem", Component: ProblemSlide },
      { path: "why-churches", Component: WhyChurchesSlide },
      { path: "product", Component: ProductSlide },
      { path: "tap-connect", Component: TapConnectSlide },
      { path: "giving-page", Component: GivingPageSlide },
      { path: "why-different", Component: WhyDifferentSlide },
      { path: "local-first", Component: LocalFirstSlide },
      { path: "next-step", Component: NextStepSlide },
    ],
  },
]);
