using Microsoft.AspNetCore.Mvc;
using todo_list.api.Models;


namespace todo_list.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private static List<TodoItem> todos = new List<TodoItem>();
        private static int nextId = 1;

        [HttpGet]
        public ActionResult<IEnumerable<TodoItem>> GetTodos()
        {
            return todos;
        }

        [HttpPost]
        public ActionResult<TodoItem> AddTodo(TodoItem todo)
        {
            todo.Id = nextId++;
            todo.IsComplete = false;
            todos.Add(todo);
            return CreatedAtAction(nameof(GetTodos), new { id = todo.Id, isComplete = todo.IsComplete }, todo);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTodo(int id)
        {
            var todo = todos.FirstOrDefault(t => t.Id == id);
            if (todo == null)
            {
                return NotFound();
            }
            todos.Remove(todo);
            return NoContent();
        }

        [HttpPut("{id}/isComplete")]
        public IActionResult UpdateIsComplete(int id, [FromBody] bool isComplete)
        {
            var todo = todos.FirstOrDefault(t => t.Id == id);
            if (todo == null)
            {
                return NotFound();
            }
            todo.IsComplete = isComplete;
            return NoContent();
        }
    }
}
