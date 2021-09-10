const tasks = {
	tasks: [
		{
			text: 'Grocery shopping',
			completed: true
		},
		{
			text: 'Clean yard',
			completed: false
		},
		{
			text: 'Film course',
			completed: false
		}
	],
	getTasksToDo() {
		const todo = this.tasks.filter((task) => !task.completed);
		todo.map((task) => console.log(task.text));
	}
};
tasks.getTasksToDo();
