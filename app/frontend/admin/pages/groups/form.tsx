import { GroupErrors, GroupResponse, GroupsCreatePayload, GroupsUpdatePayload } from "@app/sdk/client";
import { FunctionComponent, useCallback } from "react";
import { Button, Form } from "react-bootstrap";

export interface IGroupFormProps {
  group : GroupResponse
  errors ?: GroupErrors
  onSubmit : (group : GroupsCreatePayload['group'] | GroupsUpdatePayload['group']) => unknown
}

export const GroupForm : FunctionComponent<IGroupFormProps> = ({ group, errors, onSubmit }) => {
  const handleSubmit = useCallback(async (formData : FormData) => {
    const name = formData.get("name") as string
    onSubmit({ name })
  }, [onSubmit])

  return <Form action={handleSubmit}>
    <Form.Group className="mb-3" controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control type="name" name="name" placeholder="Name" defaultValue={group.name} isInvalid={!!errors?.name} />
      <Form.Control.Feedback type="invalid">
        { errors?.name?.join(', ') }
      </Form.Control.Feedback>
    </Form.Group>

    <Button variant="primary" type="submit">
      { group.id ? "Update" : "Create" }
    </Button>
  </Form>
}

export default GroupForm
