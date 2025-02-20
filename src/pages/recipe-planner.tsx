import { Card, CardContent } from "@/components/ui/card";

const RecipePlanner = () => {
  return (
    <div className="min-h-screen w-full p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Planejador de Receitas</h1>
          <p className="text-center text-muted-foreground mb-8">
            Em breve você poderá planejar suas refeições de acordo com seus objetivos de macros!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipePlanner;
