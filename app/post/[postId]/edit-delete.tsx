"use client";
import { deletePost } from "@/lib/actions/post-actions";
import { useRouter } from "next/dist/client/components/navigation";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

export default function EditDeleteButtons({ postId }: { postId: number }) {
  const router = useRouter();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleDelete = () => {
    setIsDeleting(true);
    openDeleteModal();

    try {
      deletePost(postId);
    } catch (error) {
      throw error;
    } finally {
      setIsDeleting(false);
      setIsDeleted(true);
    }
  };

  return (
    <div className="flex mt-4 items-center gap-2">
      <Link
        // href={`/post/${post.id}/edit`}
        href={`/post/edit/${postId}`}
        className="bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex flex-row items-center gap-1 px-2 py-1"
      >
        Edit <MdEdit />
      </Link>
      <button
        onClick={() => {
          openDeleteModal();
        }}
        className="cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 flex flex-row items-center gap-1 px-2 py-1"
      >
        Delete <MdDelete />
      </button>

      <Modal isOpen={isDeleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {!isDeleted ? "Confirm Delete" : "Post deleted successfully."}
              </ModalHeader>
              <ModalBody>
                {!isDeleted ? (
                  <p>Are you sure you want to delete this post?</p>
                ) : (
                  <>
                    <Button
                      className="bg-linear-to-r from-pink-500 to-yellow-500 dark:from-blue-600 dark:to-purple-600 text-white rounded-3xl shadow hover:scale-105 transition"
                      onPress={() => {
                        onClose();
                        router.push("/");
                      }}
                    >
                      Go to Home
                    </Button>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                {!isDeleted && (
                  <>
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
                      onPress={() => handleDelete()}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
