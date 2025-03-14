import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/ui/page-transition";
import { ArrowRight, Info, Zap, Target, TrendingUp, ShieldCheck } from "lucide-react";

const AboutPage = () => {
  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Sobre a NutriMacros</h1>
        <p className="text-center text-muted-foreground mb-8">
          Entenda como funcionam nossos cálculos e por que você pode confiar em nós
        </p>

        {/* Main content cards */}
        <div className="space-y-8">
          {/* How It Works Section */}
          <Card className="border border-border/50 shadow-sm overflow-hidden">
            <div className="bg-primary/10 p-4 flex items-center gap-3">
              <Info className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Como Nossa Calculadora Funciona</h2>
            </div>
            <CardContent className="p-6">
              <p className="mb-4">
                Nossa calculadora de macronutrientes utiliza fórmulas científicas estabelecidas para determinar suas
                necessidades calóricas e distribuição ideal de macronutrientes:
              </p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>
                  <span className="font-medium">Cálculo do TMB (Taxa Metabólica Basal)</span>: Utilizamos a fórmula de
                  Mifflin-St Jeor, considerada a mais precisa para estimar as calorias que seu corpo queima em repouso.
                </li>
                <li>
                  <span className="font-medium">Nível de Atividade</span>: Aplicamos um multiplicador baseado no seu
                  nível de atividade física semanal.
                </li>
                <li>
                  <span className="font-medium">Ajuste de Objetivo</span>: Modificamos suas necessidades calóricas
                  baseadas em seu objetivo (perda, manutenção ou ganho de peso).
                </li>
                <li>
                  <span className="font-medium">Distribuição de Macronutrientes</span>: Calculamos a quantidade ideal de
                  proteínas, carboidratos e gorduras com base em pesquisas científicas atuais.
                </li>
              </ol>
              <p className="text-muted-foreground italic">
                Nota: Embora nossos cálculos sejam baseados em métodos científicos, as necessidades individuais podem
                variar. Ajustes podem ser necessários com base em sua resposta específica.
              </p>
            </CardContent>
          </Card>

          {/* Why Trust Us Section */}
          <Card className="border border-border/50 shadow-sm overflow-hidden">
            <div className="bg-primary/10 p-4 flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Por Que Confiar em Nós</h2>
            </div>
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Sobre o Criador</h3>
                <p>
                  NutriMacros foi criada por Enrico Saito, nutricionista esportivo com mais de 8 anos de experiência
                  ajudando atletas e entusiastas de fitness a alcançarem seus objetivos de composição corporal.
                </p>
                <p className="mt-2">
                  Formado em Nutrição pela USP com especialização em Nutrição Esportiva pela UNIFESP, Enrico combina
                  conhecimento acadêmico sólido com experiência prática, tendo ajudado mais de 500 clientes a
                  transformarem seus corpos e saúde através de nutrição personalizada.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <p className="text-sm font-medium">🏆 Centenas de clientes satisfeitos</p>
                </div>
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <p className="text-sm font-medium">📚 Baseado em pesquisas científicas atuais</p>
                </div>
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <p className="text-sm font-medium">🔄 Atualizações regulares com novas descobertas</p>
                </div>
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <p className="text-sm font-medium">💪 Testado com atletas e pessoas comuns</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Expectations Section */}
          <Card className="border border-border/50 shadow-sm overflow-hidden">
            <div className="bg-primary/10 p-4 flex items-center gap-3">
              <Target className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Expectativas Realistas de Progresso</h2>
            </div>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2">Taxa Saudável de Mudança de Peso</h3>
              <p className="mb-4">Para resultados sustentáveis e saudáveis, recomendamos:</p>
              <div className="space-y-3 mb-6">
                <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-100 dark:border-red-900/50">
                  <p className="font-medium mb-1">Perda de Peso</p>
                  <p className="text-sm">
                    0,5kg a 1kg por semana (déficit de 500-1000 calorias/dia) é considerado seguro e sustentável.
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-100 dark:border-green-900/50">
                  <p className="font-medium mb-1">Ganho de Massa Muscular</p>
                  <p className="text-sm">
                    0,25kg a 0,5kg por semana para a maioria das pessoas (exceto iniciantes que podem ganhar mais rápido
                    inicialmente).
                  </p>
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-100 dark:border-amber-900/50 mb-4">
                <p className="font-medium">Importante:</p>
                <p className="text-sm">
                  Taxas mais rápidas de perda de peso frequentemente levam à perda de massa muscular e diminuição do
                  metabolismo, dificultando resultados de longo prazo.
                </p>
              </div>
              <p>
                Lembre-se que tanto a perda quanto o ganho de peso são raramente lineares. Flutuações de água, ciclo
                hormonal, estresse e outros fatores podem influenciar os números da balança.
              </p>
            </CardContent>
          </Card>

          {/* Adjusting Your Plan Section */}
          <Card className="border border-border/50 shadow-sm overflow-hidden">
            <div className="bg-primary/10 p-4 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Ajustando Seu Plano</h2>
            </div>
            <CardContent className="p-6">
              <p className="mb-4">
                Mesmo com cálculos precisos, ajustes individuais são essenciais para resultados ótimos. Recomendamos:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>Seguir o plano por 2-3 semanas consistentemente antes de fazer ajustes</li>
                <li>Monitorar seu peso 2-3 vezes por semana, sempre nas mesmas condições</li>
                <li>Ajustar em incrementos de 5-10% se não estiver vendo resultados</li>
                <li>Considerar medidas corporais além do peso para avaliar progresso</li>
                <li>Reconhecer quando é hora de fazer uma "pausa" metabólica durante dietas prolongadas</li>
              </ul>
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-100 dark:border-blue-900/50">
                <p className="font-medium mb-1">Dica Profissional:</p>
                <p className="text-sm">
                  Muitas pessoas cometem o erro de ajustar seus macros com muita frequência. Dê tempo ao seu corpo para
                  responder às mudanças nutricionais antes de fazer novos ajustes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Level Section (Upsell) */}
          <Card className="border-2 border-primary/50 shadow-md overflow-hidden">
            <div className="bg-primary p-4 flex items-center gap-3">
              <Zap className="h-6 w-6 text-primary-foreground" />
              <h2 className="text-xl font-semibold text-primary-foreground">Leve Sua Nutrição ao Próximo Nível</h2>
            </div>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Transforme Resultados Bons em Extraordinários</h3>
                <p>
                  Embora nossa calculadora ofereça um excelente ponto de partida, resultados verdadeiramente
                  extraordinários exigem orientação personalizada. Nossos planos premium oferecem:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-primary/10 to-primary/5 p-5 rounded-lg border border-primary/20 shadow-sm"
                >
                  <h4 className="font-medium mb-2">Plano Nutricional Personalizado</h4>
                  <ul className="text-sm space-y-1">
                    <li>✓ Macros ajustados às suas necessidades específicas</li>
                    <li>✓ Planejamento de refeições personalizado</li>
                    <li>✓ Ajustes para preferências alimentares</li>
                    <li>✓ Estratégias para problemas digestivos</li>
                  </ul>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-primary/10 to-primary/5 p-5 rounded-lg border border-primary/20 shadow-sm"
                >
                  <h4 className="font-medium mb-2">Consultoria Contínua</h4>
                  <ul className="text-sm space-y-1">
                    <li>✓ Acompanhamento semanal com nutricionista</li>
                    <li>✓ Ajustes baseados no seu progresso real</li>
                    <li>✓ Suporte via WhatsApp</li>
                    <li>✓ Orientação para eventos sociais e viagens</li>
                  </ul>
                </motion.div>
              </div>

              <div className="text-center">
                <Button className="px-8 py-6 text-lg gap-2">
                  Conhecer Planos Premium <ArrowRight className="h-5 w-5" />
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">
                  Investimentos a partir de R$97/mês com garantia de satisfação de 14 dias
                </p>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="border border-border/50 shadow-sm overflow-hidden">
            <div className="bg-primary/10 p-4">
              <h2 className="text-xl font-semibold">Perguntas Frequentes</h2>
            </div>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-medium mb-1">Por que meus macros são diferentes de outras calculadoras?</h3>
                <p className="text-sm text-muted-foreground">
                  Diferentes calculadoras usam fórmulas e pressupostos distintos. Nossa calculadora utiliza a fórmula de
                  Mifflin-St Jeor e prioriza maior ingestão de proteínas, que demonstrou ser mais eficaz para composição
                  corporal ideal.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Preciso seguir estes macros com precisão absoluta?</h3>
                <p className="text-sm text-muted-foreground">
                  Não. Para a maioria das pessoas, ficar dentro de 5-10% de cada macro diariamente é suficiente para
                  obter resultados. O mais importante é a consistência ao longo do tempo.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Posso fazer jejum intermitente com estes macros?</h3>
                <p className="text-sm text-muted-foreground">
                  Sim. Estes macros representam sua meta diária total. Você pode distribuí-los no período alimentar que
                  preferir, seja em 3 refeições tradicionais ou em uma janela alimentar reduzida.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Devo comer menos em dias sem treino?</h3>
                <p className="text-sm text-muted-foreground">
                  Para a maioria das pessoas, manter a mesma ingestão calórica diária simplifica o processo e traz
                  resultados. Abordagens mais avançadas de ciclagem de carboidratos podem ser benéficas para estágios
                  avançados.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default AboutPage;
