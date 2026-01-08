"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/image-uploader";
import { updateUser } from "@/lib/actions/user-actions";
import { Avatar, Button, Form, Input } from "@heroui/react";
import { redirect } from "next/navigation";

interface EditUserFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    bio?: string | null;
    image?: string | null;
  };
  editType: string;
}

export function EditUserForm({ user, editType }: EditUserFormProps) {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || "");
  const [imageUrl, setImageUrl] = useState(user.image || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      id: user.id,
      name,
      bio,
      avatarUrl: imageUrl,
    });
  };

  return (
    <Form
      className="space-y-4 p-4 max-w-md mx-auto flex flex-col items-center"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4">
        {editType === "profile" ? "Edit Profile" : "Complete Your Profile"}
      </h2>
      <div className="mb-4 flex flex-col items-center gap-3">
        {imageUrl && (
          <Avatar
            src={imageUrl}
            alt="Profile Image"
            size="lg"
            className="mt-2 w-56 h-56"
          />
        )}
        <ImageUploader onUploadSuccess={setImageUrl} />
      </div>
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Input
        label="Bio"
        type="textarea"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <Button type="submit" variant="bordered" fullWidth>
        Save
      </Button>
      {editType !== "profile" && (
        <Button
          onPress={() => redirect("/")}
          type="submit"
          variant="bordered"
          fullWidth
        >
          Do it later
        </Button>
      )}
    </Form>
  );
}
