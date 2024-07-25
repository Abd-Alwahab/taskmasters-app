"use client";

import { HiOutlinePlus } from "react-icons/hi";
import Modal, { ModalWindow, OpenModal } from "./Modal";
import Input from "./Input";
import FormRow from "./FormRow";
import { Controller, useForm } from "react-hook-form";
import { createNewCategoryAction } from "../_services/actoins";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../_utils/validations/taskSchema";
import TextArea from "./TextArea";
import Select from "./Select";
import { Tables } from "@/database.types";

type Props = {
  categories: Tables<"categories">[];
};
const CreateNewTask = ({ categories }: Props) => {
  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
  } = useForm<{
    title: string;
    description: string;
    points: number;
    priority: string;
    category: number;
  }>({
    resolver: zodResolver(taskSchema),
  });
  const onSubmit = (data: any) => {
    // startTransition(() => {
    createNewCategoryAction(data);
    // });
  };

  return (
    <Modal>
      <OpenModal name="new-task">
        <button className="flex items-center gap-1 rounded-lg bg-gray-900 px-4 py-2 text-white">
          <span> New Task</span>
          <HiOutlinePlus fontSize={20} />
        </button>
      </OpenModal>

      <ModalWindow name="new-task">
        <h3 className="mb-6 text-lg font-bold">Create New Task</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FormRow error={errors?.title?.message ?? ""}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input placeholder="Task Title" {...field} />
              )}
            />
          </FormRow>

          <FormRow error={errors?.description?.message ?? ""}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextArea
                  placeholder="Task description"
                  {...field}
                  maxLength={1000}
                />
              )}
            />
          </FormRow>

          <FormRow error={errors?.points?.message ?? ""}>
            <Controller
              name="points"
              control={control}
              render={({ field }) => (
                <Input placeholder="Task points" type="number" {...field} />
              )}
            />
          </FormRow>

          <FormRow error={errors?.priority?.message ?? ""}>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Priority"
                  options={[
                    {
                      label: "Low",
                      value: "Low",
                    },
                    { label: "Medium", value: "Medium" },
                    { label: "High", value: "High" },
                  ]}
                />
              )}
            />
          </FormRow>

          <FormRow error={errors?.category?.message ?? ""}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value, 10));
                    setValue("category", parseInt(e.target.value, 10));
                  }}
                  placeholder="Category"
                  options={
                    categories.map((category) => ({
                      label: category.name ?? "",
                      value: category.id.toString() ?? "",
                    })) ?? []
                  }
                />
              )}
            />
          </FormRow>

          <button className="rounded-lg bg-gray-900 px-2 py-3 text-white">
            Create
          </button>
        </form>
      </ModalWindow>
    </Modal>
  );
};

export default CreateNewTask;
