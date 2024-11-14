import { deleteAdminPeople } from "@/api/admin";
import { OpenDelPeopleModal } from "@/components/helpers/AlertDialogHelpers";
import { ItemButton } from "@/components/helpers/ButtonHelpers";
import { TableCell, TableRow } from "@/components/ui/table";
import { People } from "@/types/People";
import { PencilIcon, Trash2Icon } from "lucide-react";

type Props = {
  item: People;
  refreshAction: () => void;
  onEdit: (people: People) => void;
}

export const PeopleItem = ({item, onEdit, refreshAction}: Props) => {
  const handleDeleteButton = async () => {
    console.log("Deletando Item!!");
    if (item.id_event&&item.id_group){
      if (confirm('Tem certeza que deseja excluir esta Pessoa?')) {
        await deleteAdminPeople(item.id_event, item.id_group, item.id);
        refreshAction();
      }
    }
  }
  
  return ( 
    <>
      <TableRow className="w-full items-center ">
        <TableCell className="flex-1 p-3 mb-3 w-full">
            <div key={item.id}>{item.name}</div>
        </TableCell>
        <TableCell className="flex-1 ">
            <div className="flex items-center gap-1 mt-2 md:flex-row">
            <ItemButton 
              IconElement={PencilIcon} 
              label="" 
              onClick={ () => onEdit(item) } 
            />
            <ItemButton 
              IconElement={Trash2Icon} 
              label="" 
              onClick={ handleDeleteButton } 
            />
            <OpenDelPeopleModal 
              IconElement={Trash2Icon} 
              people={item} 
              refreshAction={refreshAction} 
            />
            </div>
        </TableCell>
      </TableRow>
    </>
  );
}