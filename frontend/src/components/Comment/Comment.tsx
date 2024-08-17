import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Text, Button, Collapse, Loader } from "@mantine/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import commentService from "@/services/commentService";
import AddChatForm from "@/components/AddChatForm/AddChatForm";
import { notifications } from "@mantine/notifications";
import useUser from "@/hooks/useUser";
import UserLink from "../UserLink";

interface CommentProps {
  id: number;
  queryKey: any;
}

export default function Comment({ id, queryKey }: CommentProps) {
  const [replyOpened, setReplyOpened] = useState(false);
  const [repliesOpened, setRepliesOpened] = useState(false);
  const queryClient = useQueryClient();

  const toggleReplyForm = () => setReplyOpened((prev) => !prev);
  const toggleReplies = () => setRepliesOpened((prev) => !prev);

  const {
    data: comment,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comment", id],
    queryFn: () => commentService.readComment(id),
  });

  const deleteMutation = useMutation({
    mutationFn: () => commentService.deleteComment(id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Comment deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({
        queryKey: ["comment", comment.parentId],
      });
      if (comment.main && !comment.parentId) {
        queryClient.invalidateQueries({
          queryKey: ["chat"],
        });
      }
      if (comment.pstp && !comment.parentId) {
        queryClient.invalidateQueries({
          queryKey: ["pstp"],
        });
      }
      if (comment.report && !comment.parentId) {
        queryClient.invalidateQueries({
          queryKey: ["report"],
        });
      }
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the comment",
        color: "red",
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const { user } = useUser();

  if (isLoading) {
    return <Loader size="sm" />;
  }

  if (error) {
    return <Text>Error loading comment.</Text>;
  }
  //bump

  return (
    <div className={`border-solid border-l-2 pl-4`}>
      {comment && (
        <>
          <div className={`flex flex-col gap-2`}>
            <Text className="text-sm sm:text-sm md:text-md">
              {comment.content}
            </Text>
            <div
              className={`flex items-center flex-wrap text-gray-500 gap-2 text-xs sm:text-sm`}
            >
              <UserLink data={comment} />
              <div>{dayjs(comment.createdAt).format("M/D/YYYY [at] ha")}</div>
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <Button size="xs" variant="subtle" onClick={toggleReplyForm}>
              {replyOpened ? "Cancel Reply" : "Reply"}
            </Button>
            {user?.id === comment.userId && (
              <Button
                size="xs"
                variant="subtle"
                color="red"
                onClick={handleDelete}
                loading={deleteMutation.isPending}
              >
                Delete
              </Button>
            )}
            {comment.replies.length > 0 && (
              <Button
                variant="subtle"
                size="xs"
                onClick={toggleReplies}
                rightIcon={repliesOpened ? <BsChevronUp /> : <BsChevronDown />}
              >
                {repliesOpened ? "Hide Replies" : "Show Replies"}
              </Button>
            )}
          </div>
          <Collapse in={replyOpened}>
            <AddChatForm
              parentId={id}
              setRepliesOpened={setRepliesOpened}
              setReplyOpened={setReplyOpened}
            />{" "}
            {/* Passing parentId to associate the reply */}
          </Collapse>
          <Collapse in={repliesOpened}>
            {repliesOpened && (
              <div className={`flex flex-col gap-4`}>
                {comment.replies?.map((reply: any) => {
                  return <Comment key={reply.id} id={reply.id} />;
                })}
              </div>
            )}
          </Collapse>
        </>
      )}
    </div>
  );
}
