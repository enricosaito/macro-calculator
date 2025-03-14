import PageTransition from "@/components/ui/page-transition";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPage = () => {
  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Política de Privacidade</h1>
        <Card className="border border-border/50 shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">1. Introdução</h2>
              <p>
                Sua privacidade é importante para nós. É política do NutriMacros respeitar a sua privacidade em relação
                a qualquer informação sua que possamos coletar no site NutriMacros, e outros sites que possuímos e
                operamos.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">2. Informações que coletamos</h2>
              <p>Coletamos as seguintes informações:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Informações pessoais que você nos fornece voluntariamente (como nome, endereço de e-mail)</li>
                <li>Informações relacionadas à saúde como peso, altura, idade e nível de atividade física</li>
                <li>Cálculos e resultados gerados com base nesses dados</li>
                <li>Informações sobre como você usa o site (através de cookies e ferramentas analíticas)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">3. Como usamos suas informações</h2>
              <p>Utilizamos as informações que coletamos das seguintes formas:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Para fornecer, operar e manter nossos serviços</li>
                <li>Para personalizar sua experiência e calcular os macronutrientes adequados às suas necessidades</li>
                <li>Para salvar os resultados de seus cálculos e preferências</li>
                <li>Para melhorar, personalizar e expandir nossos serviços</li>
                <li>Para entender e analisar como você usa nossos serviços</li>
                <li>Para desenvolver novos produtos, recursos e funcionalidades</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">4. Compartilhamento de Informações</h2>
              <p>Não compartilhamos suas informações pessoais com terceiros, exceto nas seguintes circunstâncias:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Com seu consentimento explícito</li>
                <li>Para cumprir requisitos legais, processos legais ou solicitações governamentais aplicáveis</li>
                <li>
                  Para proteger os direitos, a propriedade ou a segurança do NutriMacros, nossos usuários ou o público
                </li>
                <li>
                  Com fornecedores de serviços que trabalham em nosso nome e concordaram em usar suas informações apenas
                  em conexão com os serviços que executam para nós
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">5. Segurança</h2>
              <p>
                Valorizamos sua confiança em fornecer-nos suas informações pessoais, portanto, estamos nos empenhando
                para usar meios comercialmente aceitáveis de protegê-las. Mas lembre-se que nenhum método de transmissão
                pela internet, ou método de armazenamento eletrônico é 100% seguro e confiável, e não podemos garantir
                sua segurança absoluta.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">6. Cookies</h2>
              <p>
                O NutriMacros utiliza cookies para melhorar a experiência do usuário. Cookies são pequenos arquivos de
                texto que são armazenados no seu computador quando você visita um site. Eles são amplamente utilizados
                para fazer os sites funcionarem, trabalhar de forma mais eficiente, bem como fornecer informações aos
                proprietários do site.
              </p>
              <p className="mt-2">
                Você pode controlar e/ou excluir cookies como desejar. Você pode excluir todos os cookies que já estão
                no seu computador e pode configurar a maioria dos navegadores para impedir que sejam instalados. No
                entanto, se você fizer isso, talvez seja necessário ajustar manualmente algumas preferências sempre que
                visitar um site e alguns serviços e funcionalidades podem não funcionar.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">7. Direitos do Usuário</h2>
              <p>
                Se você tem uma conta conosco, você tem direito a acessar, corrigir, baixar ou excluir as informações
                pessoais que temos sobre você a qualquer momento. Entre em contato conosco se desejar exercer algum
                desses direitos.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">8. Mudanças nesta Política de Privacidade</h2>
              <p>
                Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer
                mudanças publicando a nova Política de Privacidade nesta página. Você é aconselhado a revisar esta
                Política de Privacidade periodicamente para quaisquer alterações.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">9. Contato</h2>
              <p>Se você tiver alguma dúvida sobre esta Política de Privacidade, por favor entre em contato conosco:</p>
              <p className="mt-2">E-mail: enricosaito@gmail.com</p>
            </div>

            <div className="pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Última atualização: {new Date().toLocaleDateString("pt-BR")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default PrivacyPage;
