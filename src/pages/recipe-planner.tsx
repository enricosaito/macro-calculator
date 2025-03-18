import PageTransition from "@/components/ui/page-transition";
import GuidedRecipePlanner from "../components/recipe-planner/guided-recipe-planner";

const RecipePlanner = () => {
  return (
    <PageTransition>
      <GuidedRecipePlanner />
    </PageTransition>
  );
};

export default RecipePlanner;
