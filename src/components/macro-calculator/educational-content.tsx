import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Target, ArrowUp, Zap, CheckCircle } from "lucide-react";
import CallToAction from "@/components/ui/call-to-action";

const EducationalContent = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div id="educational-content" className="space-y-12 mt-32 pt-16 mb-24 relative border-t border-border/20">
      <motion.div
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
              Bom, você está certo(a) de questionar o queencontra na internet, especialmente na indústria fitness.
            </p>

            <div className="pl-2 space-y-6 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Nada de achismos aqui</h3>
                  <p>
                    Nossa calculadora usa a fórmula de{" "}
                    <a
                      href="https://nutrium.com/blog/pt-br/equacao-de-mifflin-st-jeor-para-profissionais-de-nutricao/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      Mifflin-St Jeor
                    </a>
                    , reconhecida cientificamente como a mais precisa para calcular seu gasto calórico. Não inventamos
                    números mágicos — usamos matemática e ciência comprovada.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Testada com pessoas reais</h3>
                  <p>
                    Estes cálculos foram refinados com base em resultados reais de centenas de pessoas. Desde atletas
                    até pessoas comuns que nunca pisaram numa academia. E funcionou para elas!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Protegendo seu músculo</h3>
                  <p>
                    Nossa distribuição de macros prioriza proteína adequada — o segredo para manter (ou ganhar) músculo
                    enquanto perde gordura. Esse é o erro que muitas calculadoras cometem!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/50">
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
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
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

            <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-100 dark:border-amber-900/50">
              <p>
                <span className="font-medium">Lembre-se:</span> Paciência é tudo na transformação corporal. O corpo que
                você quer demora tempo para ser construído — e os resultados duradouros vêm de quem entende que é uma
                maratona, não uma corrida de 100 metros.
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
            3
          </span>
          "Quanta gordura posso perder por semana sem prejudicar minha saúde?"
        </h2>
        <Card className="border border-border/50">
          <CardContent className="p-6">
            <p className="text-lg mb-6">
              Esta é a pergunta que todos fazem, mas poucos respondem com honestidade. Vamos falar a verdade aqui.
            </p>

            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-100 dark:border-green-900/50 h-full">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Meta de perda ideal
                  </h3>
                  <p className="text-2xl font-bold text-green-600 mb-3">0,5 a 1kg por semana</p>
                  <p>
                    Este ritmo permite que você preserve músculo, mantenha sua energia e metabolismo, e o mais
                    importante: <span className="font-medium">não sofra o efeito sanfona</span> depois.
                  </p>
                </div>

                <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-100 dark:border-red-900/50 h-full">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />O que acontece se for mais rápido
                  </h3>
                  <p className="mb-2">Tentou perder 2kg+ por semana? Prepare-se para:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Perda de músculo (que diminui seu metabolismo)</li>
                    <li>Cansaço constante e irritabilidade</li>
                    <li>Fome incontrolável levando a compulsões</li>
                    <li>Recuperar tudo de volta (e mais um pouco)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pl-2 mb-6">
              <h3 className="font-medium mb-2">Para quem quer ganhar massa muscular:</h3>
              <p className="mb-4">O ganho muscular natural é um processo lento, mas consistente:</p>
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/50">
                <p className="mb-1">
                  <span className="font-medium">Iniciantes:</span> Até 900g de músculo por mês (nos primeiros 6 meses)
                </p>
                <p className="mb-1">
                  <span className="font-medium">Intermediários:</span> 400-500g por mês
                </p>
                <p>
                  <span className="font-medium">Avançados:</span> 200-300g por mês (após anos de treino)
                </p>
              </div>
            </div>

            <p>
              <span className="font-medium">A verdade:</span> Transformações impressionantes levam tempo. Aquele "antes
              e depois" de 30 dias que você viu no Instagram? Provavelmente envolveu desidratação, iluminação favorável,
              ou não foi feito em apenas um mês.
            </p>
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
            4
          </span>
          "Como isso muda dependendo do meu nível de experiência?"
        </h2>
        <Card className="border border-border/50">
          <CardContent className="p-6">
            <p className="text-lg mb-6">
              Seu nível de experiência com treino e dieta muda completamente como você deve abordar sua nutrição.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800/50">
                <h3 className="font-medium mb-3 text-blue-700 dark:text-blue-400">Iniciante</h3>
                <p className="text-sm mb-3">Menos de 1 ano de treino consistente</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Foque em consistência, não perfeição</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Ajustes a cada 3-4 semanas são suficientes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Seu corpo responderá bem a quase qualquer estímulo</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-b from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 p-5 rounded-lg border border-purple-200 dark:border-purple-800/50">
                <h3 className="font-medium mb-3 text-purple-700 dark:text-purple-400">Intermediário</h3>
                <p className="text-sm mb-3">1-3 anos de treino estruturado</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Precisão maior com macros se torna importante</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Ciclagem de carboidratos pode trazer benefícios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Considere timing nutricional ao redor dos treinos</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-b from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 p-5 rounded-lg border border-amber-200 dark:border-amber-800/50">
                <h3 className="font-medium mb-3 text-amber-700 dark:text-amber-400">Avançado</h3>
                <p className="text-sm mb-3">3+ anos de treino sério e dieta estruturada</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Ajustes mais frequentes e precisos são necessários</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Periodização nutricional alinhada aos ciclos de treino</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Microajustes fazem grande diferença nos resultados</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-primary/10 p-5 rounded-lg border border-primary/20">
              <h3 className="font-medium mb-2">Qual é a maior diferença entre níveis?</h3>
              <p className="mb-3">
                O <span className="font-medium">detalhamento</span> e <span className="font-medium">precisão</span>{" "}
                necessários para continuar progredindo:
              </p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    <span className="font-medium">Iniciantes:</span> Podem progredir mesmo com abordagens simples e
                    margem para erros
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    <span className="font-medium">Intermediários:</span> Precisam de maior atenção a macronutrientes e
                    timing nutricional
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    <span className="font-medium">Avançados:</span> Necessitam estratégias personalizadas e
                    acompanhamento profissional frequente
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>

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
              <Zap className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h2 className="font-bold text-2xl mb-1">Quer resultados mais rápidos e personalizados?</h2>
                <p>
                  Mesmo a melhor calculadora não substitui o olhar especializado de um profissional que pode adaptar seu
                  plano às suas necessidades específicas.
                </p>
              </div>
            </div>

            <CallToAction />
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
