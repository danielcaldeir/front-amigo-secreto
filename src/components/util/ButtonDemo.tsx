import { Button } from "../ui/button";

type Props = {
    variant: string;

}
export function ButtonDemo((variant = 'default')) {
    return <Button variant={variant} >Button</Button>
}