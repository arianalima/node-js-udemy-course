const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const { userOne, taskOne, userTwo, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ description: "from my test" })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toBe(false);
});

test("Should get user tasks", async () => {
  const respose = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(respose.body.length).toBe(2);
});

test("Should not delete task when unauthorized", async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .send()
    .expect(401);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
