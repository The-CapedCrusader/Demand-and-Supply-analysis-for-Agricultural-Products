import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { Link } from 'react-router';

import { Badge } from '~/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Link to="/market-reports" className="block">
        <Card className="hover:bg-muted/50 @container/card transition-colors">
          <CardHeader>
            <CardDescription>Current Crop Prices</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              $2.75/kg
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +8.2%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Rice prices rising <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Average prices for last 3 months
            </div>
          </CardFooter>
        </Card>
      </Link>
      <Link to="/market-analysis" className="block">
        <Card className="hover:bg-muted/50 @container/card transition-colors">
          <CardHeader>
            <CardDescription>Market Demand</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              5,234 tons
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +12%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Increasing demand <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Regional demand for vegetables
            </div>
          </CardFooter>
        </Card>
      </Link>
      <Link to="/inventory-scanner" className="block">
        <Card className="hover:bg-muted/50 @container/card transition-colors">
          <CardHeader>
            <CardDescription>Current Inventory</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              3,850 kg
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingDown />
                -15%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Decreasing inventory <IconTrendingDown className="size-4" />
            </div>
            <div className="text-muted-foreground">Good time to restock</div>
          </CardFooter>
        </Card>
      </Link>
      <Link to="/crop-management" className="block">
        <Card className="hover:bg-muted/50 @container/card transition-colors">
          <CardHeader>
            <CardDescription>Yield Forecast</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              92%
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +4.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Expected harvest increase <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Based on current conditions
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
