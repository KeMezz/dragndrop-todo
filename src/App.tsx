import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDosState } from "./atoms";
import DroppableBoard from "./components/DroppableBoard";

const Title = styled.h1`
  text-align: center;
  padding: 30px;
  font-size: 40px;
  line-height: 1.4;
  font-weight: 800;
`;

const Boards = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  gap: 20px;
  @media (max-width: 810px) {
    grid-template-columns: 1fr;
  }
`;

interface TrashProps {
  isDraggingOver: boolean
}

const Trash = styled.div<TrashProps>`
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  background-color: ${(props) =>
    props.isDraggingOver ? "crimson" : props.theme.cardColor};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-size: 30px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDosState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      // 같은 보드에서 움직일 때의 상황 가정하기
      setToDos((allBoards) => {
        const targetBoard = [...allBoards[source.droppableId]];
        const taskObj = targetBoard[source.index];
        targetBoard.splice(source.index, 1);
        targetBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: targetBoard,
        };
      });
    }
    if (destination.droppableId === "trash") {
      setToDos(allBoards => {
        const targetBoard = [...allBoards[source.droppableId]];
        targetBoard.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: targetBoard
        }
      })
      return null;
    }
    if (source.droppableId !== destination.droppableId) {
      // 다른 보드끼리 움직일 때의 상황 가정하기
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const targetBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Title>Just Drag And Drop!</Title>
      <Boards>
        {Object.keys(toDos).map((boardId) => (
          <DroppableBoard
            key={boardId}
            droppableId={boardId}
            toDos={toDos[boardId]}
          />
        ))}
      </Boards>
      <Droppable droppableId="trash">
        {(magic, snapshot) => (
          <Trash
            isDraggingOver={snapshot.isDraggingOver}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            <i className="xi-trash"></i>
          </Trash>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
