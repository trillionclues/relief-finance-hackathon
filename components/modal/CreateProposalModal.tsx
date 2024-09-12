"use client";
import { CreateProposalFormData } from "@/types/CreateProposalForm";
import React, { useState, useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: CreateProposalFormData) => void;
  isCreating: boolean;
}

const CreateProposalModal = ({
  isOpen,
  onClose,
  onSubmit,
  isCreating,
}: Props) => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    physicalAddress: "",
    goal: "",
    duration: "",
    category: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    physicalAddress: "",
    goal: "",
    duration: "",
    category: "",
  });

  const modalRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {
      title: formValues.title ? "" : "Title is required",
      description: formValues.description ? "" : "Description is required",
      physicalAddress: formValues.physicalAddress
        ? ""
        : "Physical address is required",
      goal:
        formValues.goal && Number(formValues.goal) > 0
          ? ""
          : "Goal must be a positive number",
      duration:
        formValues.duration && Number(formValues.duration) > 0
          ? ""
          : "Duration must be a positive number",
      category: formValues.category ? "" : "Category is required",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const formData: CreateProposalFormData = {
        ...formValues,
        goal: Number(formValues.goal),
        duration: Number(formValues.duration),
      };
      onSubmit(formData);
      isCreating ? null : handleClose();
    }
  };

  const handleClose = () => {
    setFormValues({
      title: "",
      description: "",
      physicalAddress: "",
      goal: "",
      duration: "",
      category: "",
    });
    setErrors({
      title: "",
      description: "",
      physicalAddress: "",
      goal: "",
      duration: "",
      category: "",
    });
    onClose();
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white p-4 md:p-4 rounded-lg shadow-lg max-w-xl w-full md:max-h-screen max-h-[90vh] overflow-y-auto mt-10"
      >
        <h2 className="text-lg font-semibold mb-4 text-center">
          Create Campaign Proposal
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-1">
              <label className="block text-sm font-medium mb-1" htmlFor="title">
                Campaign Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formValues.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title}</p>
              )}
            </div>

            <div className="mb-1">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="physicalAddress"
              >
                Physical Address
              </label>
              <input
                type="text"
                name="physicalAddress"
                id="physicalAddress"
                value={formValues.physicalAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              {errors.physicalAddress && (
                <p className="text-red-500 text-xs">{errors.physicalAddress}</p>
              )}
            </div>

            <div className="mb-1">
              <label className="block text-sm font-medium mb-1" htmlFor="goal">
                Goal Amount (in RWA)
              </label>
              <input
                type="number"
                name="goal"
                id="goal"
                value={formValues.goal}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              {errors.goal && (
                <p className="text-red-500 text-xs">{errors.goal}</p>
              )}
            </div>

            <div className="mb-1">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="duration"
              >
                Duration (in days)
              </label>
              <input
                type="number"
                name="duration"
                id="duration"
                value={formValues.duration}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              {errors.duration && (
                <p className="text-red-500 text-xs">{errors.duration}</p>
              )}
            </div>

            <div className="mb-1 w-full">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="category"
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                value={formValues.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm"
              >
                <option value="">Select a Category</option>
                <option value="DISASTER">Disaster</option>
                <option value="CHILDREN">Children</option>
                <option value="FOOD_CRISES">Food Crises</option>
                <option value="HEALTH">Health</option>
                <option value="EDUCATION">Education</option>
                <option value="HOMELESS">Homeless</option>
                <option value="ANIMAL">Animal</option>
                <option value="PANDEMIC">Pandemic</option>
                <option value="WAR_CRISES">War Crises</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs">{errors.category}</p>
              )}
            </div>

            <div className="md:col-span-2 mb-1">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formValues.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm"
                maxLength={300}
                rows={1}
                style={{ resize: "none" }}
              />

              {errors.description && (
                <p className="text-red-500 text-xs">{errors.description}</p>
              )}
            </div>
          </div>
          <div className="flex w-full space-x-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-3 rounded-md shadow-sm hover:bg-gray-600 w-1/2"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-3 rounded-md shadow-sm hover:bg-teal-600 w-1/2"
              disabled={isCreating}
            >
              {isCreating ? "Creating campaign..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProposalModal;
