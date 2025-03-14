import PageTransition from "@/components/ui/page-transition";
import { Card, CardContent } from "@/components/ui/card";

const TermsPage = () => {
  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Termos de Serviço</h1>
        <Card className="border border-border/50 shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">1. Termos</h2>
              <p>
                Ao acessar o site NutriMacros, você concorda em cumprir estes termos de serviço, todas as leis e
                regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais
                aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">2. Uso da Licença</h2>
              <p>
                É concedida permissão para usar temporariamente o NutriMacros para uso pessoal, não comercial. Esta
                licença não inclui: modificação ou cópia dos materiais; uso dos materiais para qualquer finalidade
                comercial ou exibição pública; tentativa de descompilar ou fazer engenharia reversa de qualquer software
                contido no NutriMacros; remoção de quaisquer direitos autorais ou outras notações de propriedade dos
                materiais; ou transferência dos materiais para outra pessoa ou 'espelhamento' dos materiais em qualquer
                outro servidor.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">3. Isenção de Responsabilidade</h2>
              <p>
                Os materiais no NutriMacros são fornecidos 'como estão'. NutriMacros não oferece garantias, expressas ou
                implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação,
                garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de
                propriedade intelectual ou outra violação de direitos.
              </p>
              <p className="mt-2">
                Além disso, o NutriMacros não garante ou faz qualquer representação relativa à precisão, aos resultados
                prováveis ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a tais
                materiais ou em sites vinculados a este site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">4. Limitações</h2>
              <p>
                Em nenhum caso o NutriMacros ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem
                limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou
                da incapacidade de usar os materiais no NutriMacros, mesmo que NutriMacros ou um representante
                autorizado da NutriMacros tenha sido notificado oralmente ou por escrito da possibilidade de tais danos.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">5. Precisão dos Materiais</h2>
              <p>
                Os materiais exibidos no site da NutriMacros podem incluir erros técnicos, tipográficos ou fotográficos.
                NutriMacros não garante que qualquer material em seu site seja preciso, completo ou atual. NutriMacros
                pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">6. Links</h2>
              <p>
                O NutriMacros não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de
                nenhum site vinculado. A inclusão de qualquer link não implica endosso por NutriMacros do site. O uso de
                qualquer site vinculado é por conta e risco do usuário.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">7. Modificações</h2>
              <p>
                O NutriMacros pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar
                este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">8. Lei Aplicável</h2>
              <p>
                Estes termos e condições são regidos e interpretados de acordo com as leis brasileiras e você se submete
                irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
              </p>
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

export default TermsPage;
