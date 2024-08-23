"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

interface AddUserModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isVisible, onClose }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !email) {
      alert("Please add a name and email");
      return;
    }

    setIsLoading(true); // Show loading state

    try {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        setSuccessMessage("User added successfully!");
        setTimeout(() => {
          setName(""); // Clear form fields
          setEmail("");
          setSuccessMessage(null); // Clear success message
          onClose(); // Close modal
          window.location.reload(); // Refresh the page
        }, 500);
      } else {
        setError("Failed to add user. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleClose = () => {
    setName(""); // Clear form fields
    setEmail("");
    setSuccessMessage(null); // Clear success message
    setError(null); // Clear error message
    onClose(); // Close modal
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[1200px] flex flex-col">
        <button
          className="text-white text-3xl place-self-end my-2 font-bold"
          onClick={handleClose}
        >
          X
        </button>
        <div className="bg-white p-2 rounded py-32">
          <div className="container mx-auto py-10">
            <h3 className="text-3xl font-bold flex justify-center items-center">Add Users!</h3>
            <hr className="my-3" />
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                  placeholder="Enter Name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="flex justify-center items-center">
                <input
                  type="email"
                  className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                  placeholder="Enter Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Adding User..." : "Add User"}
                </button>
              </div>
            </form>
            {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
