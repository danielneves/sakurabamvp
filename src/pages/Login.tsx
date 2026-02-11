import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import sakurabaLogo from "@/assets/sakuraba-logo.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (error) {
        toast({ title: "Erro ao cadastrar", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Conta criada!", description: "Faça login com suas credenciais." });
        setIsSignUp(false);
      }
    } else {
      const { error } = await signIn(email, password);
      setLoading(false);
      if (error) {
        toast({ title: "Erro ao fazer login", description: error.message, variant: "destructive" });
      } else {
        navigate("/admin");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src={sakurabaLogo} alt="Sakuraba Law" className="h-12 mx-auto mb-4" />
          <CardTitle>Painel Administrativo</CardTitle>
          <CardDescription>
            {isSignUp ? "Crie sua conta para acessar o CMS" : "Entre com suas credenciais para acessar o CMS"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="seu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" minLength={6} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (isSignUp ? "Cadastrando..." : "Entrando...") : (isSignUp ? "Cadastrar" : "Entrar")}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button type="button" className="text-sm text-muted-foreground hover:text-foreground underline" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Já tem conta? Faça login" : "Não tem conta? Cadastre-se"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
