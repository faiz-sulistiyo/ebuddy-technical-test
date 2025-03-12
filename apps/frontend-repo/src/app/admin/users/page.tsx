"use client"
import PageContainer from "@/components/shared/PageContainer"
import DataTable from "@/components/shared/DataTable"
import {userColumns} from "@/const/table"
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useInsertUserMutation,
  useUpdateUserMutation,
} from "@/store/api/user"
import FormDialog from "@/components/shared/FormDialog"
import UserForm from "@/components/forms/UserForm"
import {useSelector} from "react-redux"
import {RootState} from "@/store/store"
import {useAppDispatch} from "@/store/hooks"
import {User} from "@ebuddy/types"
import {resetUser, setPagination, setUser} from "@/store/userSlice"
import {useState} from "react"
import ConfirmDialog from "@/components/shared/ConfirmDialog"
import {Box, Typography} from "@mui/material"

export default function UserPage() {
  const {user, pagination} = useSelector((state: RootState) => state.user)

  const {
    data: response,
    isLoading,
    refetch: refetchUser,
    isSuccess,
    error,
  } = useGetUsersQuery({
    page: pagination.page,
    limit: pagination.limit,
  })

  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const [
    updateUser,
    {
      isLoading: isLoadingUpdate,
      isSuccess: isSuccessUpdate,
      error: errorUpdate,
    },
  ] = useUpdateUserMutation()
  const [
    insertUser,
    {
      isLoading: isLoadingInsert,
      isSuccess: isSuccessInsert,
      error: errorInsert,
    },
  ] = useInsertUserMutation()
  const [
    deleteUser,
    {
      isLoading: isLoadingDelete,
      isSuccess: isSuccessDelete,
      error: errorDelete,
    },
  ] = useDeleteUserMutation()

  const dispatch = useAppDispatch()
  const handleOnChange = (user: User) => {
    dispatch(setUser(user))
  }

  const handleOnSubmitCreateUser = async () => {
    if (user.id) {
      await updateUser({id: user.id, data: user})
    } else {
      await insertUser(user)
    }
    refetchUser()
    setOpen(false)
  }

  const handleOnClickEdit = (row: User) => {
    dispatch(setUser(row))
    setOpen(true)
  }

  const handleClickAdd = () => {
    dispatch(resetUser())
    setOpen(true)
  }

  const handleConfirmDeleteUser = async () => {
    if (user.id) {
      await deleteUser(user.id)
      dispatch(resetUser())
      setOpenDelete(false)
      await refetchUser()
    }
  }

  const handleClickDelete = (row: User) => {
    dispatch(setUser(row))
    setOpenDelete(true)
  }

  const handlePaginationChange = (value: number, key: string) => {
    dispatch(
      setPagination({
        ...pagination,
        [key]: value,
      }),
    )
  }

  return (
    <PageContainer
      title="Users"
      addButtonText="Add User"
      onClickAdd={handleClickAdd}
    >
      <Box display="flex" gap={10}>
        {/* Fetching Users Status */}
        <Box display="flex" flexDirection="column">
          <Typography variant="body1" color="textPrimary">
            Fetching Users: {isLoading ? "Loading..." : "Completed"}
          </Typography>
          <Typography
            variant="body1"
            color={isSuccess ? "success.main" : "error.main"}
          >
            Fetch Success: {isSuccess ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1" color="error">
            Fetch Error: {error ? error.toString() : "None"}
          </Typography>
        </Box>
        {/* Creating User Status */}
        <Box display="flex" flexDirection="column">
          <Typography variant="body1" color="textPrimary">
            Creating User: {isLoadingInsert ? "Loading..." : "Idle"}
          </Typography>
          <Typography
            variant="body1"
            color={isSuccessInsert ? "success.main" : "error.main"}
          >
            Create Success: {isSuccessInsert ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1" color="error">
            Create Error: {errorInsert ? errorInsert.toString() : "None"}
          </Typography>
        </Box>

        {/* Updating User Status */}
        <Box display="flex" flexDirection="column">
          <Typography variant="body1" color="textPrimary">
            Updating User: {isLoadingUpdate ? "Loading..." : "Idle"}
          </Typography>
          <Typography
            variant="body1"
            color={isSuccessUpdate ? "success.main" : "error.main"}
          >
            Update Success: {isSuccessUpdate ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1" color="error">
            Update Error: {errorUpdate ? errorUpdate.toString() : "None"}
          </Typography>
        </Box>

        {/* Deleting User Status */}
        <Box display="flex" flexDirection="column">
          <Typography variant="body1" color="textPrimary">
            Deleting User: {isLoadingDelete ? "Loading..." : "Idle"}
          </Typography>
          <Typography
            variant="body1"
            color={isSuccessDelete ? "success.main" : "error.main"}
          >
            Delete Success: {isSuccessDelete ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1" color="error">
            Delete Error: {errorDelete ? errorDelete.toString() : "None"}
          </Typography>
        </Box>
      </Box>

      <ConfirmDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        onConfirm={handleConfirmDeleteUser}
        loading={isLoadingDelete}
      />
      <FormDialog
        buttonCancelText="Cancel"
        buttonSubmitText="Save"
        onClose={() => setOpen(false)}
        open={open}
        title={user.id ? "Edit User" : "Add User"}
        onSubmit={handleOnSubmitCreateUser}
        loading={isLoadingUpdate || isLoadingInsert}
      >
        <UserForm onChange={handleOnChange} user={user} />
      </FormDialog>
      <DataTable
        columns={userColumns}
        rows={response?.data ?? []}
        page={pagination.page ?? 1}
        rowsPerPage={pagination.limit ?? 10}
        totalRows={pagination.totalItem ?? 0}
        loading={isLoading}
        onDelete={handleClickDelete}
        onEdit={handleOnClickEdit}
        onPageChange={(page) => handlePaginationChange(page, "page")}
        onRowPerPageChange={(rowsPerPage) =>
          handlePaginationChange(rowsPerPage, "limit")
        }
      />
    </PageContainer>
  )
}
