import { PencilIcon, Trash2Icon } from "lucide-react";
import { ItemButton } from "@/components/helpers/ButtonHelpers";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Group } from "@/types/Group";
import { deleteAdminGroup } from "@/api/admin";

type GroupItemProps = {
  item: Group;
  refreshAction: () => void;
  onEdit: (group: Group) => void;
}

export const GroupItem = ({ item, onEdit, refreshAction }: GroupItemProps) => {
  // const handleEditButton = () => openModal(item, 'edit');
  // const handleDelButton = () => openModal(item, 'del');

  const handleDeleteButton = async () => {
    console.log("Deletando Item!!");
    if (confirm('Tem certeza que deseja excluir este Grupo?')) {
      await deleteAdminGroup(item.id_event, item.id);
      refreshAction();
    }
  }
  
  return (
    <>
    {/* <Table className="border p-3 mb-3 flex flex-col items-center rounded md:flex-row"> */}
      {/* <TableBody className="w-full items-center"> */}
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
                  </div>
              </TableCell>
          </TableRow>
      {/* </TableBody> */}
    {/* </Table> */}
    </>
  );
}
  