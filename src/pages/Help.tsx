

import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { HelpCircle, MessageCircle, Mail, FileText, Send } from 'lucide-react';
import { useState } from 'react';

const Help = () => {
  const [question, setQuestion] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Pergunta enviada:', { email, question });
    // Aqui você pode adicionar a lógica para enviar a pergunta
    setQuestion('');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex w-full">
        <Sidebar />
        
        <div className="flex-1 w-full lg:ml-0">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 lg:px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 ml-12 lg:ml-0">Ajuda</h1>
              </div>
            </div>
          </header>

          <main className="p-4 lg:p-6 h-full">
            <div className="w-full max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="h-fit">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <HelpCircle className="h-5 w-5 text-blue-500 mr-3" />
                    <div>
                      <CardTitle className="text-lg">Central de Ajuda</CardTitle>
                      <CardDescription>
                        Encontre respostas para as perguntas mais frequentes
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Acesse nossa base de conhecimento com tutoriais e guias detalhados.
                    </p>
                  </CardContent>
                </Card>

                <Card className="h-fit">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <MessageCircle className="h-5 w-5 text-green-500 mr-3" />
                    <div>
                      <CardTitle className="text-lg">Chat de Suporte</CardTitle>
                      <CardDescription>
                        Converse com nossa equipe de suporte
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Suporte online disponível de segunda a sexta, das 9h às 18h.
                    </p>
                  </CardContent>
                </Card>

                <Card className="h-fit">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <Mail className="h-5 w-5 text-purple-500 mr-3" />
                    <div>
                      <CardTitle className="text-lg">Suporte por Email</CardTitle>
                      <CardDescription>
                        Envie sua dúvida por email
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      suporte@utmtracker.com - Respondemos em até 24 horas.
                    </p>
                  </CardContent>
                </Card>

                <Card className="h-fit">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <FileText className="h-5 w-5 text-orange-500 mr-3" />
                    <div>
                      <CardTitle className="text-lg">Documentação</CardTitle>
                      <CardDescription>
                        Guias técnicos e documentação da API
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Documentação completa para desenvolvedores e usuários avançados.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Novo card para perguntas específicas */}
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                  <Send className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <CardTitle className="text-lg">Faça uma Pergunta Específica</CardTitle>
                    <CardDescription>
                      Tem uma dúvida que não encontrou resposta? Envie sua pergunta aqui
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Seu Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                        Sua Pergunta
                      </label>
                      <Textarea
                        id="question"
                        placeholder="Descreva sua dúvida ou pergunta aqui..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                        rows={4}
                        className="w-full resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                      disabled={!email || !question}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Pergunta
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Help;

