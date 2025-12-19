"use client";
import { deletePostsByUser } from "@/lib/actions/post-actions";
import { deleteUser } from "@/lib/actions/user-actions";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth-actions";

export default function SettingsClient() {
  const router = useRouter();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deletionType, setDeletionType] = useState<"posts" | "profile" | null>(
    null
  );

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleDelete = () => {
    setIsDeleting(true);
    openDeleteModal();

    try {
      if (deletionType === "posts") {
        deletePostsByUser();
      } else if (deletionType === "profile") {
        deleteUser();
        signOut();
      }
    } catch (error) {
      throw error;
    } finally {
      setIsDeleting(false);
      setIsDeleted(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader className="flex flex-col gap-1 items-start">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-sm text-default-500">
            Manage your account preferences and security
          </p>
        </CardHeader>

        <Divider />

        <CardBody className="flex flex-col gap-6">
          {/* Delete All Posts */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Delete All Posts</h2>
              <p className="text-sm text-default-500">
                Permanently remove all your published posts
              </p>
            </div>
            <Button
              color="warning"
              variant="bordered"
              onPress={() => {
                setDeleteModalOpen(true);
                setDeletionType("posts");
              }}
            >
              Delete Posts
            </Button>
          </div>

          <Divider />

          {/* Delete Profile */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-danger">Delete Profile</h2>
              <p className="text-sm text-default-500">
                This action is permanent and cannot be undone
              </p>
            </div>
            <Button
              color="danger"
              onPress={() => {
                setDeletionType("profile");
                setDeleteModalOpen(true);
              }}
            >
              Delete Profile
            </Button>
          </div>
        </CardBody>

        <CardFooter className="flex justify-end">
          <p className="text-xs text-default-400">
            Be careful with destructive actions
          </p>
        </CardFooter>
      </Card>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onOpenChange={(isOpen) => {
          setDeleteModalOpen(isOpen);

          if (!isOpen && isDeleted) {
            router.push("/");
          }
        }}
        className="flex items-center"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {!isDeleted ? "Confirm Delete" : "Deleted successfully."}
              </ModalHeader>
              <ModalBody>
                {!isDeleted ? (
                  <p>Are you sure? This action cannot be undone.</p>
                ) : (
                  <>
                    {deletionType === "posts" ? (
                      <p>All your posts have been deleted.</p>
                    ) : (
                      <>
                        <p>Your profile has been deleted.</p>
                        <p className="mt-2">We are sorry to see you go ;(</p>
                      </>
                    )}
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
