"use client";

import {
  Button,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  TextField,
} from "@heroui/react";

const priorityOptions = [
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
];

const statusOptions = [
  { id: "pending", label: "Pending" },
  { id: "in-progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
];

const estimateOptions = [
  { id: "1h", label: "1h" },
  { id: "2h", label: "2h" },
  { id: "3h", label: "3h" },
  { id: "4h", label: "4h" },
  { id: "6h", label: "6h" },
  { id: "8h", label: "8h" },
];

const fieldClassName =
  "w-full rounded-2xl border border-slate-200 bg-white/95 text-slate-800 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition focus-within:border-teal-400 focus-within:shadow-[0_0_0_4px_rgba(45,212,191,0.16)] dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100 dark:shadow-[0_16px_36px_rgba(0,0,0,0.34)] dark:focus-within:border-teal-400 dark:focus-within:shadow-[0_0_0_4px_rgba(45,212,191,0.14)]";

const fieldGroupClassName = "grid gap-2";

const labelClassName =
  "mb-2 block text-sm font-semibold tracking-[0.01em] text-slate-700 dark:text-slate-200";

const AddTask = ({ createTask }) => {
  return (
    <div className="tasks-add-task">
      <Modal>
        <Button className="tasks-add-task-button" variant="primary">
          <span className="tasks-add-task-icon">+</span>
          <span>Add Task</span>
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="w-[calc(100vw-2rem)] overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_32px_90px_rgba(15,23,42,0.22)] dark:border-slate-700/80 dark:bg-[linear-gradient(180deg,#0f172a_0%,#020617_100%)] dark:shadow-[0_36px_110px_rgba(0,0,0,0.52)] sm:max-w-xl">
              <Modal.CloseTrigger />

              <Modal.Header className="flex items-start gap-4 border-b border-slate-200 px-6 py-6 dark:border-slate-800">
                <Modal.Icon className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 shadow-sm dark:bg-emerald-500/12 dark:text-emerald-300 dark:shadow-[0_10px_22px_rgba(0,0,0,0.22)]">
                  <span className="text-xl leading-none">+</span>
                </Modal.Icon>
                <div className="min-w-0 flex-1">
                  <Modal.Heading className="text-2xl font-extrabold leading-7 text-slate-900 dark:text-slate-50">
                    Add New Task
                  </Modal.Heading>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Fill in the task details and assign it to the right team
                    member.
                  </p>
                </div>
              </Modal.Header>

              <Modal.Body className="px-6 py-5">
                <form action={createTask} className="grid w-full gap-4">
                  <TextField className={fieldGroupClassName} name="title" type="text">
                    <Label className={labelClassName}>Task Title</Label>
                    <Input className={fieldClassName} placeholder="Enter task title" />
                  </TextField>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField className={fieldGroupClassName} name="user" type="text">
                      <Label className={labelClassName}>Assigned To</Label>
                      <Input
                        className={fieldClassName}
                        placeholder="Team member name"
                      />
                    </TextField>
                    <TextField
                      className={fieldGroupClassName}
                      name="userRole"
                      type="text"
                    >
                      <Label className={labelClassName}>User Role</Label>
                      <Input className={fieldClassName} placeholder="Frontend Lead" />
                    </TextField>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField
                      className={fieldGroupClassName}
                      name="category"
                      type="text"
                    >
                      <Label className={labelClassName}>Category</Label>
                      <Input
                        className={fieldClassName}
                        placeholder="Design, Setup, Testing"
                      />
                    </TextField>
                    <TextField
                      className={fieldGroupClassName}
                      name="dueDate"
                      type="date"
                    >
                      <Label className={labelClassName}>Due Date</Label>
                      <Input className={fieldClassName} />
                    </TextField>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <Select
                      className={fieldGroupClassName}
                      defaultSelectedKey="pending"
                      name="status"
                    >
                      <Label className={labelClassName}>Status</Label>
                      <Select.Trigger className={fieldClassName}>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {statusOptions.map((option) => (
                            <ListBox.Item id={option.id} key={option.id}>
                              {option.label}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>

                    <Select
                      className={fieldGroupClassName}
                      defaultSelectedKey="medium"
                      name="priority"
                    >
                      <Label className={labelClassName}>Priority</Label>
                      <Select.Trigger className={fieldClassName}>
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
                      className={fieldGroupClassName}
                      defaultSelectedKey="2h"
                      name="estimate"
                    >
                      <Label className={labelClassName}>Estimate</Label>
                      <Select.Trigger className={fieldClassName}>
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

                  <TextField
                    className={fieldGroupClassName}
                    maxLength={3}
                    name="progress"
                    type="number"
                  >
                    <Label className={labelClassName}>Progress</Label>
                    <Input
                      className={fieldClassName}
                      max="100"
                      min="0"
                      placeholder="0 to 100"
                    />
                  </TextField>

                  <TextField className={fieldGroupClassName} name="description">
                    <Label className={labelClassName}>Description</Label>
                    <Input
                      className={fieldClassName}
                      placeholder="Short task description"
                    />
                  </TextField>

                  <div className="mt-2 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row sm:justify-end">
                    <Button
                      className="w-full rounded-full border border-slate-200 bg-slate-100 text-slate-700 shadow-none transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 sm:w-auto"
                      slot="close"
                      variant="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="w-full rounded-full bg-[linear-gradient(135deg,#0f766e,#2563eb)] px-6 font-semibold text-white shadow-[0_14px_28px_rgba(37,99,235,0.22)] sm:w-auto"
                      slot="close"
                      type="submit"
                    >
                      Save Task
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default AddTask;
