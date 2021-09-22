import { Table, Button, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";

const StaffTable = ({ data }: any) => {
  const staffs = data?.users?.results;
  console.log(staffs);
  return (
    <Table variant="striped">
      {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
      <Thead>
        <Tr>
          <Th
            onClick={() => console.log("Clicked: Name")}
            _hover={{
              cursor: "pointer",
            }}
          >
            Name
          </Th>
          <Th
            onClick={() => console.log("Clicked: CounterNumber")}
            _hover={{
              cursor: "pointer",
            }}
          >
            Counter #
          </Th>
          <Th
            onClick={() => console.log("Clicked: Position")}
            _hover={{
              cursor: "pointer",
            }}
          >
            Position
          </Th>
        </Tr>
      </Thead>
      <Tbody sx={{ textAlign: "center" }}>
        {staffs.map((staff: any) => (
          <Tr
            onClick={() => console.log("Clicked :", staff._id)}
            key={staff._id}
            sx={{
              transition: ".2s",
              width: "50%",
            }}
            _hover={{
              bg: "gray.300",
              cursor: "pointer",
            }}
          >
            <Td>{staff.username}</Td>
            <Td>{staff.counterNumber}</Td>
            <Td>{staff.role}</Td>

            <Td p="0" m="0">
              <Button colorScheme="orange" mx="1" size="sm">
                Edit
              </Button>
              <Button colorScheme="red" mx="1" size="sm">
                Remove
              </Button>
              <Button colorScheme="blue" mx="1" size="sm">
                View
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
      {/* <Tfoot>
     <Tr>
          <Th>To convert</Th>
          <Th>into</Th>
          <Th isNumeric>multiply by</Th>
        </Tr> 
      </Tfoot> */}
    </Table>
  );
};

export default StaffTable;
