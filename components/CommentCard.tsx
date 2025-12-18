"use client";
import { FaRegTrashAlt } from "react-icons/fa";
import type { Prisma } from "@/prisma/generated/client";
import type { JSX } from "react";
import { useState } from "react";

import {
  Avatar,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import Link from "next/link";
import { deleteComment } from "@/lib/actions/comments-actions";

export default function CommentCard({
  comment,
  user,
}: {
  comment: Prisma.CommentGetPayload<{
    include: { author: true };
  }>;
  user?: {
    id: string;
  };
}): JSX.Element {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleDeleteComment = async (commentId: number) => {
    setIsDeleting(true);
    try {
      const response = await deleteComment(commentId, comment.postId);

      if (!response) {
        throw new Error("Failed to delete comment");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsDeleting(false);
      closeDeleteModal();
    }
  };

  return (
    <Card key={comment.id} className="flex flex-col border-b  pb-2 relative">
      <CardBody>
        <Link
          href={`/user/${comment.authorId}`}
          className="text-foreground font-medium flex gap-2 items-center"
        >
          <Avatar src={comment.author.image || ""} alt={comment.author.name} />
          <h4 className="text-lg font-semibold inline-block">
            {comment.author.name}
          </h4>
        </Link>

        <p className="text-foreground mt-4">{comment.content}</p>
        <div className="text-foreground/40 text-sm flex justify-between mt-2 mb-2">
          <span className="">
            Posted on: {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>

        {comment.author.id === user?.id && (
          <span
            onClick={openDeleteModal}
            className="text-gray-500 text-lg absolute right-5 top-5 active:text-red-800 hover:text-red-600 cursor-pointer"
            role="button"
            tabIndex={0}
          >
            <FaRegTrashAlt />
          </span>
        )}
      </CardBody>

      <Modal isOpen={isDeleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Delete
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this comment?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    closeDeleteModal();
                  }}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={() => handleDeleteComment(comment.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
}
