import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ContactPage = () => {
  const [lang] = useState<"pt" | "en">("pt");

  const contactInfo = [
    {
      icon: MapPin,
      title: "Endereço",
      content: "123 Bay Street, Suite 500\nToronto, ON M5J 2T3",
    },
    {
      icon: Phone,
      title: "Telefone",
      content: "+1 (416) 123-4567",
    },
    {
      icon: Mail,
      title: "Email",
      content: "contato@sakurabalaw.ca",
    },
    {
      icon: Clock,
      title: "Horário",
      content: "Seg - Sex: 9h às 18h\nSáb: Com agendamento",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="gradient-navy text-primary-foreground py-16 md:py-20">
          <div className="container">
            <div className="max-w-3xl">
              <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
                Contato
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Fale <span className="text-accent">Conosco</span>
              </h1>
              <p className="text-lg text-primary-foreground/90 leading-relaxed">
                Estamos prontos para ouvir sua história e ajudar com sua jornada jurídica.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Envie sua Mensagem</CardTitle>
                    <CardDescription>
                      Preencha o formulário abaixo e entraremos em contato em até 24 horas.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome Completo *</Label>
                          <Input id="name" placeholder="Seu nome" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input id="email" type="email" placeholder="seu@email.com" required />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefone</Label>
                          <Input id="phone" placeholder="+1 (___) ___-____" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="service">Área de Interesse</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immigration">Imigração</SelectItem>
                              <SelectItem value="family">Família & Divórcio</SelectItem>
                              <SelectItem value="realestate">Imóveis</SelectItem>
                              <SelectItem value="wills">Testamentos & Herança</SelectItem>
                              <SelectItem value="business">Empresas</SelectItem>
                              <SelectItem value="other">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Sua Mensagem *</Label>
                        <Textarea
                          id="message"
                          placeholder="Descreva brevemente sua situação..."
                          rows={5}
                          required
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full md:w-auto">
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Mensagem
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                {contactInfo.map((info, idx) => (
                  <Card key={idx}>
                    <CardContent className="flex items-start gap-4 pt-6">
                      <div className="h-10 w-10 rounded-lg bg-accent/20 text-accent flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                        <p className="text-muted-foreground text-sm whitespace-pre-line">
                          {info.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
      <WhatsAppButton />
    </div>
  );
};

export default ContactPage;
