import TableComponent from './components/TableComponent.tsx';
// import Counter from './components/Counter.tsx';
// import TodoList from './components/TodoList.tsx';
import CountDown from './components/CountDown.tsx';


function App() {
  return <div className="app">
    <CountDown endTime={new Date('2025-11-25')} />
    <TableComponent />
    {/* <Counter />
    <TodoList /> */}

  </div>

}
export default App;
