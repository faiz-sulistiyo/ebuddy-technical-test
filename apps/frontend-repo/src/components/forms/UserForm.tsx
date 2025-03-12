"use client"
import {User} from "@ebuddy/types"
import {Box, TextField} from "@mui/material"
import React, {useState} from "react"
import {DatePicker} from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"

interface UserFormProps {
  user: User
  onChange: (user: User) => void
}

const UserForm: React.FC<UserFormProps> = ({user, onChange}) => {
  const [value, setValue] = useState<User>(user)
  const handleOnChange = (value: string | number, key: keyof User) => {
    console.log({value,key})
    const tempValue = {
      ...user,
      [key]: value,
    }
    setValue(tempValue)
    onChange(tempValue)
  }
  return (
    <Box display="flex" flexDirection="column" gap={2} minWidth={400} my={2}>
      <TextField
        label="name"
        value={value.name}
        onChange={(e) => handleOnChange(e.target.value, "name")}
      />
      <TextField
        label="email"
        value={value.email}
        onChange={(e) => handleOnChange(e.target.value, "email")}
      />
      <TextField
        label="totalAverageWeightRatings"
        value={value.totalAverageWeightRatings}
        type="number"
        onChange={(e) =>
          handleOnChange(
            Number(e.target.value ?? 0),
            "totalAverageWeightRatings",
          )
        }
      />
      <TextField
        label="numberOfRents"
        value={value.numberOfRents}
        type="number"
        onChange={(e) =>
          handleOnChange(Number(e.target.value ?? 0), "numberOfRents")
        }
      />
      <DatePicker
        label="recentlyActive"
        value={dayjs(value.recentlyActive)}
        onChange={(val) => {
          const date = val?.toDate().getTime();
          if (date) {
            handleOnChange(date, 'recentlyActive');
          }
        }}
      />
    </Box>
  )
}

export default UserForm
