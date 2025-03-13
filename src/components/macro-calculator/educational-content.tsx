import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, AlertTriangle, Target, ArrowUp, Zap } from "lucide-react";
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
        <h2 className="font-bold text-3xl mb-3 flex items-center gap-2">
          <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-lg">
            1
          </span>
          Essa calculadora funciona, e por que eu deveria confiar nela?
        </h2>
        <Card className="border border-border/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Info className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <p>
                Nossa calculadora foi desenvolvida com base em fórmulas científicas estabelecidas para determinar suas
                necessidades calóricas e a distribuição ideal de macronutrientes. Não usamos "achismos" ou regras
                arbitrárias – cada número é gerado a partir de décadas de pesquisas em nutrição esportiva.
              </p>
            </div>

            <div className="pl-8 space-y-4 mb-6">
              <div>
                <h3 className="font-medium mb-1">Como seus macros são calculados:</h3>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Calculamos sua Taxa Metabólica Basal (TMB) usando a fórmula de Mifflin-St Jeor</li>
                  <li>Aplicamos um multiplicador específico para seu nível de atividade física</li>
                  <li>Ajustamos as calorias com base no seu objetivo (perda, manutenção ou ganho)</li>
                  <li>Distribuímos os macronutrientes priorizando proteínas para preservação muscular</li>
                </ol>
              </div>

              <div>
                <h3 className="font-medium mb-1">Por que você pode confiar:</h3>
                <p className="mb-2">
                  Esta calculadora foi criada por Enrico Saito, nutricionista esportivo com mais de 8 anos de
                  experiência trabalhando com atletas e pessoas comuns em busca de transformação corporal.
                </p>
                <p>
                  As fórmulas e distribuições de macros são baseadas não apenas na teoria nutricional, mas também
                  refinadas através da experiência real com centenas de clientes que alcançaram resultados
                  impressionantes.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/50">
              <p className="text-sm">
                <span className="font-medium">Nota importante:</span> Embora esta calculadora forneça um excelente ponto
                de partida, cada pessoa é única. Os resultados reais podem variar devido a diferenças individuais em
                metabolismo, composição corporal, genética e outros fatores.
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
        <h2 className="font-bold text-3xl mb-3 flex items-center gap-2">
          <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-lg">
            2
          </span>
          Você precisará ajustar esses macros, uma hora ou outra
        </h2>
        <Card className="border border-border/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
              <p>
                Por melhor que seja nossa calculadora, é apenas um ponto de partida. Seu corpo é um sistema dinâmico que
                se adapta constantemente às mudanças – incluindo alterações na sua dieta e atividade física.
              </p>
            </div>

            <div className="pl-8 space-y-4 mb-6">
              <div>
                <h3 className="font-medium mb-1">Quando ajustar seus macros:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Quando o progresso estagna por mais de 2 semanas</li>
                  <li>Quando sua atividade física aumenta ou diminui significativamente</li>
                  <li>Após perder ou ganhar quantidade substancial de peso</li>
                  <li>Quando seus objetivos mudam (ex: de perda de peso para ganho muscular)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-1">Como fazer ajustes eficazes:</h3>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Siga o plano atual por pelo menos 2-3 semanas antes de fazer alterações</li>
                  <li>Monitore seu peso, medidas e fotos consistentemente</li>
                  <li>Faça ajustes pequenos (5-10% das calorias totais)</li>
                  <li>Dê ao seu corpo 1-2 semanas para se adaptar a cada ajuste</li>
                </ol>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-100 dark:border-amber-900/50">
              <p className="text-sm">
                <span className="font-medium">Atenção:</span> Muitas pessoas cometem o erro de mudar seus macros com
                frequência demais, sem dar tempo suficiente para o corpo responder. Seja paciente e metódico com os
                ajustes para obter os melhores resultados a longo prazo.
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
        <h2 className="font-bold text-3xl mb-3 flex items-center gap-2">
          <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-lg">
            3
          </span>
          Agora você deve estar se perguntando, "Qual é uma taxa desejável de perda/ganho de peso?"
        </h2>
        <Card className="border border-border/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Target className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <p>
                Definir expectativas realistas é crucial para o sucesso a longo prazo. Muitas pessoas abandonam dietas
                eficazes por esperarem resultados irrealisticamente rápidos.
              </p>
            </div>

            <div className="pl-8 space-y-6 mb-6">
              <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-100 dark:border-red-900/50">
                <h3 className="font-medium mb-1">Para perda de peso saudável:</h3>
                <p className="mb-2">
                  <span className="font-medium">0,5kg a 1kg por semana</span> é o intervalo ideal para a maioria das
                  pessoas.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Preserva a massa muscular, que mantém seu metabolismo ativo</li>
                  <li>Permite que seu corpo e hormônios se ajustem gradualmente</li>
                  <li>É mais sustentável psicologicamente e menos restritivo</li>
                  <li>Resulta em menor efeito rebote ("efeito sanfona")</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-100 dark:border-green-900/50">
                <h3 className="font-medium mb-1">Para ganho de massa muscular:</h3>
                <p className="mb-2">
                  <span className="font-medium">0,25kg a 0,5kg por semana</span> representa um ganho de massa magra
                  ideal.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Maximiza o ganho muscular enquanto minimiza o acúmulo de gordura</li>
                  <li>Permite progresso consistente nos treinos</li>
                  <li>Dá tempo para adaptações musculares e estruturais</li>
                  <li>Lembre-se: a genética impõe limites ao ganho muscular natural</li>
                </ul>
              </div>
            </div>

            <div className="pl-8 mb-6">
              <h3 className="font-medium mb-2">Por que taxas mais rápidas geralmente falham?</h3>
              <p className="mb-3">A perda de peso muito rápida (mais de 1kg por semana) geralmente leva a:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Perda significativa de massa muscular</li>
                <li>Desaceleração metabólica excessiva</li>
                <li>Desequilíbrios hormonais</li>
                <li>Maior risco de recuperar todo o peso perdido (e mais)</li>
              </ul>
            </div>

            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <p className="text-sm">
                <span className="font-medium">Lembre-se:</span> Seu peso pode flutuar diariamente devido à retenção de
                água, conteúdo intestinal e outros fatores. É a tendência ao longo do tempo que realmente importa, não
                os números diários na balança.
              </p>
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
