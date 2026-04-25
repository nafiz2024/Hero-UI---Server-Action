"use client";

import {
  Button,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  Surface,
  TextField,
} from "@heroui/react";

const priorityOptions = [
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
];

const estimateOptions = [
  { id: "1h", label: "1h" },
  { id: "2h", label: "2h" },
  { id: "3h", label: "3h" },
  { id: "4h", label: "4h" },
  { id: "6h", label: "6h" },
  { id: "8h", label: "8h" },
];

const AddTask = ({ createTask }) => {
  return (
    <div className="flex w-full justify-end">
      <Modal>
        <Button className="min-w-32 justify-center" variant="secondary">
          Add Task
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="w-[calc(100vw-2rem)] sm:max-w-lg">
              <Modal.CloseTrigger />

              <Modal.Header className="flex items-start gap-4 border-b border-default-200 px-6 py-5">
                <Modal.Icon className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <span className="text-xl leading-none">+</span>
                </Modal.Icon>
                <div className="min-w-0 flex-1">
                  <Modal.Heading className="text-xl font-bold leading-7">
                    Add New Task
                  </Modal.Heading>
                  <p className="mt-1.5 text-sm leading-6 text-muted">
                    Fill in the task details and assign it to the right team
                    member.
                  </p>
                </div>
              </Modal.Header>

              <Modal.Body className="px-6 py-5">
                <Surface className="w-full" variant="default">
                  <form action={createTask} className="grid w-full gap-4">
                    <TextField className="w-full" name="title" type="text">
                      <Label>Task Title</Label>
                      <Input placeholder="Enter task title" />
                    </TextField>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <TextField className="w-full" name="assignee" type="text">
                        <Label>Assigned To</Label>
                        <Input placeholder="Team member" />
                      </TextField>
                      <TextField className="w-full" name="dueDate" type="date">
                        <Label>Due Date</Label>
                        <Input />
                      </TextField>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Select
                        className="w-full"
                        defaultSelectedKey="medium"
                        name="priority"
                      >
                        <Label>Priority</Label>
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {priorityOptions.map((option) => (
                              <ListBox.Item id={option.id} key={option.id}>
                                {option.label}
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>

                      <Select
                        className="w-full"
                        defaultSelectedKey="2h"
                        name="estimate"
                      >
                        <Label>Estimate</Label>
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {estimateOptions.map((option) => (
                              <ListBox.Item id={option.id} key={option.id}>
                                {option.label}
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    <TextField className="w-full" name="description">
                      <Label>Description</Label>
                      <Input placeholder="Short task description" />
                    </TextField>

                    <div className="flex flex-col-reverse gap-3 border-t border-default-200 px-6 py-4 sm:flex-row sm:justify-end">
                      <Button
                        className="w-full sm:w-auto"
                        slot="close"
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="w-full sm:w-auto"
                        slot="close"
                        type="submit"
                      >
                        Save Task
                      </Button>
                    </div>
                  </form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default AddTask;
