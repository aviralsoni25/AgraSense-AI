import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Scheme } from "@/types";

type SchemeCardProps = {
  scheme: Scheme;
};

export function SchemeCard({ scheme }: SchemeCardProps) {
  return (
    <Card className="hover-lift rounded-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base">{scheme.title}</CardTitle>
          <Badge variant="secondary">Eligible</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <p className="text-muted-foreground">{scheme.summary}</p>
        <div>
          <p className="font-medium">Eligibility</p>
          <p className="text-muted-foreground">{scheme.eligibility}</p>
        </div>
        <div>
          <p className="font-medium">Benefit</p>
          <p className="text-muted-foreground">{scheme.benefit}</p>
        </div>
        <a href={scheme.applyLink} target="_blank" rel="noreferrer">
          <Button variant="outline" className="w-full">
            Apply Link
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}
