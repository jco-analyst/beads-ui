import { ChevronDownIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

/**
 * Smoke gallery for the shadcn (base-vega / Base UI) base components (bdui-321.3).
 *
 * It is intentionally exhaustive over the six ported primitives so the build and
 * type-checker prove each one compiles and renders, including the Base UI
 * render-prop composition pattern (`render={<Button />}`) — the replacement for
 * Radix `asChild`. Real views replace this in later migration stories.
 */
export function UiGallery() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>shadcn base-vega</CardTitle>
        <CardDescription>Base UI primitives, render-prop API.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-2">
        <Badge>default</Badge>
        <Badge variant="outline">outline</Badge>

        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost">Hover</Button>} />
          <TooltipContent>Base UI tooltip</TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline">
                Menu
                <ChevronDownIcon />
              </Button>
            }
          />
          <DropdownMenuContent>
            <DropdownMenuItem>First</DropdownMenuItem>
            <DropdownMenuItem>Second</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog>
          <DialogTrigger render={<Button>Open dialog</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog</DialogTitle>
              <DialogDescription>
                Composed via Base UI render-prop, not Radix asChild.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter showCloseButton />
            <DialogClose render={<Button variant="secondary">Done</Button>} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
