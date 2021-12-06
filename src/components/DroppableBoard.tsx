import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoInterface, toDosState } from "../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #81ecec;
  border-radius: 16px;
  height: fit-content;
  min-height: 400px;
`;

interface BoardProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const Board = styled.ul<BoardProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 12px;
  border-radius: 16px;
  transition: background-color 0.3s ease-in-out;
  background-color: ${(props) =>
    props.isDraggingOver ? "#55efc4" : "#00cec9"};
`;

const Title = styled.h2`
  color: ${(props) => props.theme.bgColor};
  text-align: center;
  padding: 20px 0;
  font-size: 20px;
  font-weight: 600;
`;

interface DroppableBoardInterface {
  droppableId: string;
  toDos: toDoInterface[];
}
interface FormInterface {
  toDo: string;
}
const Form = styled.form`
  display: flex;
  height: 40px;
  padding-bottom: 12px;
  justify-content: center;
  gap: 10px;
`;
const Input = styled.input`
    width: 60%;
    padding: 0 20px;
    border: none;
    border-radius: 20px;
    &:focus {
        outline: none;
    }
`;
const AddBtn = styled.button`
    width: 20%;
    border: none;
    background-color: crimson;
    color: white;
    border-radius: 20px;
    cursor: pointer;
`;

function DroppableBoard({ droppableId, toDos }: DroppableBoardInterface) {
  const { register, setValue, handleSubmit } = useForm<FormInterface>();
  const [allToDos, setAllToDos] = useRecoilState(toDosState);
  const onFormValid = (data: FormInterface) => {
    setAllToDos(allBoards => {
        const newToDo: toDoInterface = { text: data.toDo, id: Date.now() };
        return {
            ...allBoards,
            [droppableId]: [newToDo, ...allBoards[droppableId]]
        }
    })
    setValue("toDo", "");
  };
  localStorage.setItem("toDos", JSON.stringify(allToDos));

  return (
    <Wrapper>
      <Title>{droppableId}</Title>
      <Form onSubmit={handleSubmit(onFormValid)}>
        <Input
          {...register("toDo", { required: "할 일을 입력하세요" })}
          type="text"
          placeholder={`Add Task On ${droppableId}`}
          autoComplete="off"
          autoSave="off"
        />
        <AddBtn>Add</AddBtn>
      </Form>
      <Droppable droppableId={droppableId}>
        {(magic, snapshot) => (
          <Board
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                toDoID={toDo.id}
                toDoText={toDo.text}
                index={index}
              />
            ))}
            {magic.placeholder}
          </Board>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default DroppableBoard;
