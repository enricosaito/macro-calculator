// src/components/macro-calculator/educational-content.tsx
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, UtensilsCrossed, ArrowUp, Star, Beaker, Users } from "lucide-react";

const EducationalContent = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navigate = useNavigate();

  return (
    <div id="educational-content" className="space-y-48 mt-32 pt-16 mb-24 relative border-t border-border/20">
      <motion.div
        id="education-point-1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-bold text-3xl mb-3 flex items-start gap-2">
          <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0 mt-1">
            1
          </span>
          "Essa calculadora realmente funciona, e porque eu deveria confiar nela?"
        </h2>
        <Card className="border border-border/50">
          <CardContent className="p-6">
            <p className="text-lg mb-6">
              Bom, você está certo(a) de questionar o que encontra na internet, especialmente na indústria fitness.
            </p>

            <div className="pl-2 space-y-6 mb-6">
              <div className="flex items-start gap-3">
                <Beaker className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Nada de achismos aqui</h3>
                  <p>
                    Nossa calculadora usa a fórmula de{" "}
                    <a
                      href="https://nutrium.com/blog/pt-br/equacao-de-mifflin-st-jeor-para-profissionais-de-nutricao/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline hover:text-primary/80"
                    >
                      Mifflin-St Jeor
                    </a>
                    , reconhecida cientificamente como a mais precisa para calcular seu gasto calórico. Não inventamos
                    números mágicos — usamos matemática e ciência comprovada.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Testada com pessoas reais</h3>
                  <p>
                    Estes cálculos foram refinados com base em resultados reais de centenas de pessoas. Desde atletas
                    até pessoas comuns que nunca pisaram numa academia. E funcionou para elas!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Protegendo seu músculo</h3>
                  <p>
                    Nossa distribuição de macros prioriza proteína adequada — o segredo para manter (ou ganhar) músculo
                    enquanto perde gordura. Esse é o erro que muitas calculadoras cometem!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <p>
                <span className="font-medium">Direto ao ponto:</span> Estes números são um excelente ponto de partida.
                São baseados em ciência sólida e experiência real. É como ter um mini-nutricionista no seu bolso.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-bold text-3xl mb-3 flex items-start gap-2">
          <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0 mt-1">
            2
          </span>
          Você vai precisar ajustar esses macros cedo ou tarde para atingir seus objetivos desejados
        </h2>
        <Card className="border border-border/50">
          <CardContent className="p-6">
            <p className="text-lg mb-6">
              Seu corpo é inteligente e se adapta constantemente. Você vai precisar ajustar esses números ao longo da
              jornada.
            </p>

            <div className="pl-2 space-y-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">O erro que quase todo mundo comete</h3>
                  <p>
                    Mudar seus macros toda semana porque não viu resultado imediato. Isso é como trocar de rota a cada 5
                    minutos durante uma viagem só porque ainda não chegou ao destino!
                  </p>
                </div>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <h3 className="font-medium mb-2">Como saber quando ajustar:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>
                      Quando seu peso estacionar por mais de 2-3 semanas (mesmo seguindo o plano corretamente)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>Quando sua rotina mudar drasticamente (muito mais ou menos atividade física)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>Quando você ganhar ou perder mais de 5kg</span>
                  </li>
                </ul>
              </div>

              <p>
                <span className="font-medium">Dica de ouro:</span> Faça pequenos ajustes de cada vez (cerca de 10% das
                calorias). Isso permite que você veja exatamente o que está funcionando sem mudanças drásticas.
              </p>
            </div>

            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <p>
                <span className="font-medium">Lembre-se:</span> Paciência é tudo na transformação corporal. O corpo que
                você quer demora tempo para ser construído — e os resultados duradouros vêm de quem entende que é uma
                maratona, não uma corrida de 100 metros.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <h2 className="font-bold text-3xl mb-3 flex items-start gap-2">
        <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0 mt-1">
          3
        </span>
        "Como transformar meus macros em refeições deliciosas?"
      </h2>
      <Card className="border border-border/50">
        <CardContent className="p-6">
          <p className="text-lg mb-6">
            Saber suas metas de macros é apenas metade do caminho. Transformá-las em pratos saborosos e variados é o
            maior desafio do dia a dia.
          </p>

          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 h-full">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <UtensilsCrossed className="h-5 w-5 text-primary" />
                  Planejamento inteligente
                </h3>
                <p className="text-2xl font-bold text-primary mb-3">Receitas personalizadas</p>
                <p>
                  Nosso planejador de receitas cria pratos deliciosos que encaixam perfeitamente nos seus macros, sem
                  comprometer o sabor ou a variedade.
                </p>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 h-full">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Erros comuns de alimentação
                </h3>
                <p className="mb-2">Evite estas armadilhas que podem sabotar seus resultados:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Monotonia alimentar que leva a compulsões</li>
                  <li>Receitas sem sabor que desanimam</li>
                  <li>Não aproveitar os ingredientes que já tem</li>
                  <li>Planos de refeição muito complicados</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pl-2 mb-6">
            <h3 className="font-medium mb-2">Como nosso planejador de receitas ajuda:</h3>
            <p className="mb-4">Transforme seus macros em refeições deliciosas de forma prática:</p>
            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <p className="mb-1">
                <span className="font-medium">Simplificado:</span> Selecione os ingredientes que você já tem em casa
              </p>
              <p className="mb-1">
                <span className="font-medium">Personalizado:</span> Receba sugestões de receitas que se encaixam nos
                seus macros
              </p>
              <p>
                <span className="font-medium">Prático:</span> Instruções passo a passo e informações nutricionais
                detalhadas
              </p>
            </div>
          </div>

          <p>
            <span className="font-medium">A verdade:</span> Seguir seus macros não significa comer frango com batata
            doce todos os dias. Com as receitas certas, você pode desfrutar de refeições deliciosas enquanto alcança
            seus objetivos de composição corporal.
          </p>
        </CardContent>
      </Card>

      {/* Call to Action section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-2 border-primary/30 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-6">
              <UtensilsCrossed className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h2 className="font-bold text-2xl mb-1">Transforme seus macros em refeições deliciosas!</h2>
                <p>
                  Agora que você conhece seus macros ideais, use nosso planejador de receitas para criar pratos
                  incríveis que se encaixam perfeitamente no seu plano nutricional.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={() => navigate("/recipes")}
                className="px-8 py-6 text-lg gap-2 bg-gradient-to-r from-primary to-primary/80"
              >
                <UtensilsCrossed className="h-5 w-5 mr-2" />
                Explorar Receitas Agora
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                Dê sabor ao seu plano alimentar e mantenha-se motivado com uma variedade de opções deliciosas!
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Scroll to top button */}
      <div className="fixed bottom-24 right-4 z-50">
        <Button
          onClick={scrollToTop}
          size="icon"
          className="rounded-full shadow-lg h-12 w-12 bg-primary hover:bg-primary/90"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default EducationalContent;
