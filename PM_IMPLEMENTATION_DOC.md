# PM Implementation Document: Deliverables, Tasks, and Boards

## Table of Contents

1. [Overview](#overview)
2. [Data Models](#data-models)
3. [User Flows](#user-flows)
4. [Features & Functionality](#features--functionality)
5. [API Endpoints](#api-endpoints)
6. [Business Rules](#business-rules)
7. [UI Components](#ui-components)
8. [Edge Cases & Special Behaviors](#edge-cases--special-behaviors)

---

## Overview

The Kreatli Review Tool implements a comprehensive project management system with three core entities:

- **Deliverables**: Client-facing outputs that track project deliverables with status, due dates, and linked media/tasks
- **Tasks**: Internal work items that can be organized on a Kanban-style board with stages
- **Boards**: Visual Kanban board interface for managing tasks across project stages

### Key Relationships

- Tasks can be linked to Deliverables (many-to-many via `linkedTasks`)
- Deliverables can be created from Tasks (one-to-one via `taskId`)
- Tasks can be placed on a Board via `projectStage` or remain "unplaced"
- Both Tasks and Deliverables can link to Media/Assets

---

## Data Models

### Task Model

**Schema Fields:**

- `id` (string, required): Unique identifier
- `name` (string, required, max 200 chars): Task name
- `inCharge` (User, required): Primary person responsible
- `assignees` (User[], required, min 1): List of assigned users
- `projectStage` (string | null): Stage ID if placed on board, null if unplaced
- `linkedMedia` (Asset[], optional): Array of linked media/asset IDs
- `projectId` (string, required): Parent project
- `order` (number, default 0): Order within stage for sorting
- `createdAt` (Date, required)
- `createdBy` (User, required)
- `updatedAt` (Date, required)
- `updatedBy` (User, required)

**Key Constraints:**

- Must have at least one assignee
- `projectStage` can be null (unplaced tasks)
- Order is automatically calculated when moving between stages

### Deliverable Model

**Schema Fields:**

- `id` (string, required): Unique identifier
- `name` (string, required, max 200 chars): Deliverable name
- `inCharge` (User, required): Person in charge
- `linkedMedia` (Asset[], required, min 1): At least one media file required
- `dueDate` (Date, required): Due date for deliverable
- `status` (string, required): Status ID from project's deliverableStatuses
- `format` (string, optional, max 100 chars): Format (e.g., "MP4", "PDF")
- `version` (string, optional, max 50 chars): Version identifier
- `projectId` (string, required): Parent project
- `taskId` (string, optional): Original task ID if created from task
- `linkedTasks` (Task[], optional): Array of linked task IDs
- `createdAt` (Date, required)
- `createdBy` (User, required)
- `updatedAt` (Date, required)
- `updatedBy` (User, required)

**Key Constraints:**

- Must have at least one linked media file
- Status must exist in project's `deliverableStatuses`
- Can optionally link to multiple tasks

### Project Stage Model

**Schema Fields:**

- `id` (string, required): Unique identifier
- `name` (string, required): Stage name (e.g., "To Do", "In Progress", "Done")
- `order` (number, required): Display order
- `color` (string, optional): Hex color for visual representation

**Usage:**

- Stages define columns on the Kanban board
- Tasks are assigned to stages via `projectStage` field
- Tasks without a `projectStage` are considered "unplaced"

---

## User Flows

### Creating a Task

1. **From Board View:**

   - Click "+" button in any stage column
   - Modal opens with stage pre-selected
   - Fill in: name, in charge, assignees, optional media
   - Task is created with the selected stage

2. **From My Tasks Panel:**

   - Click "Create Task" button
   - Modal opens without stage pre-selected
   - Task is created as "unplaced" (no `projectStage`)

3. **From Asset/Media View:**
   - Click "Create Task" in ReviewToolTasksPanel
   - Modal opens with media pre-selected
   - Task is created with linked media

**Post-Creation:**

- Task appears in the selected stage (if stage provided)
- Or appears in "My Tasks" panel if unplaced
- Order is automatically set to highest + 1 for the stage

### Creating a Deliverable

1. **Standalone Creation:**

   - Navigate to Deliverables list
   - Click "Create Deliverable"
   - Fill in: name, in charge, media (required), due date, status, optional format/version
   - Optionally link tasks

2. **From Task:**
   - Open task card/panel
   - Click "Create a Deliverable" (only available for placed tasks)
   - Modal pre-fills with task data (name, in charge, media)
   - Task is automatically linked via `taskId` and `linkedTasks`

**Post-Creation:**

- Deliverable appears in deliverables list
- If created from task, task shows deliverable chip/badge

### Moving Tasks on Board

1. **Drag & Drop:**

   - Drag task card from one column to another
   - Task's `projectStage` updates to new stage
   - Order is recalculated for both old and new stages
   - Optimistic UI update with API call

2. **Move to Unplaced:**

   - Drag task to "My Tasks" panel
   - Task's `projectStage` set to null
   - **Critical:** Task is automatically removed from all deliverables' `linkedTasks`
   - Task becomes visible only to owner (inCharge or assignees)

3. **Reorder Within Column:**
   - Drag task above/below another task in same column
   - Order values are updated (currently UI-only, API support pending)

### Linking Tasks to Deliverables

1. **From Deliverable:**

   - Open deliverable card/modal
   - Click "Add Task" in "Attached Tasks" section
   - Select from tasks (unplaced tasks excluded)
   - Task ID added to `linkedTasks` array

2. **From Task:**
   - When creating task, optionally select deliverable
   - After task creation, task is automatically added to deliverable's `linkedTasks`

**Unlinking:**

- Click remove button on task in deliverable's task list
- Task ID removed from `linkedTasks` array

---

## Features & Functionality

### Board View

**Layout:**

- Horizontal columns for each project stage
- Each column shows tasks assigned to that stage
- "My Tasks" side panel for unplaced tasks

**Visibility Rules:**

- **Placed Tasks** (`projectStage` set): Visible to all project members
- **Unplaced Tasks** (`projectStage` null): Only visible to:
  - Task's `inCharge` user
  - Users in task's `assignees` array

**Filtering:**

- Filter by stage: "All", or specific stage
- Filter affects both board columns and task count

**Drag & Drop:**

- Uses `@dnd-kit` library
- Activation distance: 5px (prevents accidental drags)
- Visual feedback: drag overlay, column highlighting
- Optimistic updates with error handling

### Deliverables List View

**Display:**

- Table format with columns: Media, Name, Status, Due Date, Format, Version, Actions
- Expandable rows to show linked tasks
- Media preview thumbnails

**Filtering:**

- Filter by status: "All" or specific status
- Status chips with color coding

**Status Management:**

- Customizable statuses per project
- Statuses have: label, color, order
- Editable via "Edit Statuses" modal

**Overdue Detection:**

- Deliverable is overdue if:
  - `dueDate` < current date
  - Status is NOT "approved" or "published" (case-insensitive check)

### Task Card Features

**Visual Elements:**

- Large media preview (if media exists)
- Task name (clickable to edit)
- Assignee avatars (inCharge + assignees, max 3 visible)
- Stage chip with color coding
- Deliverable chip (if linked)
- Actions menu (edit, create deliverable, delete)

**Media Preview:**

- Primary media shown as large image/video thumbnail
- Additional media shown as small thumbnails
- Click to navigate to asset view

**Deliverable Badge:**

- Shows if task is linked to deliverable
- Clickable to navigate to deliverables list
- Only shown for placed tasks (not unplaced)

### Deliverable Card Features

**Visual Elements:**

- Large media preview (first media file)
- Deliverable name (draggable for sorting)
- Status indicator (colored dot)
- Format and version chips
- In charge assignee dropdown
- Due date with overdue indicator
- Linked tasks accordion

**Media Management:**

- Add/remove media via AssetPicker
- Shows count and thumbnails
- First media shown as large preview
- Remaining media shown as thumbnails (max 6 visible)

**Task Linking:**

- Accordion section for linked tasks
- Add tasks via TaskPicker (excludes unplaced)
- Task cards show: name, stage, assignees, media preview
- Click task to navigate to board view
- Remove task to unlink

**Status Management:**

- Dropdown to change status
- Status colors from project configuration
- Sorted by order

---

## API Endpoints

### Tasks

**GET** `/project/:projectId/tasks`

- Returns all tasks for project
- Optional query params: `inCharge`, `assignee`, `stage`
- Response: `TaskDto[]`

**GET** `/project/:projectId/tasks/:taskId`

- Returns single task
- Response: `TaskDto`

**POST** `/project/:projectId/tasks`

- Creates new task
- Body: `TaskBodyDto`
- Response: `TaskDto`

**PATCH** `/project/:projectId/tasks/:taskId`

- Updates task
- Body: `TaskEditBodyDto` (all fields optional)
- Response: `TaskDto`

**DELETE** `/project/:projectId/tasks/:taskId`

- Deletes task
- Response: void

**PATCH** `/project/:projectId/tasks/:taskId/reorder`

- Reorders task within stage
- Body: `TaskReorderBodyDto` (order: number)
- Response: `TaskDto`

### Deliverables

**GET** `/project/:projectId/deliverables`

- Returns all deliverables for project
- Optional query params: `status`, `inCharge`
- Response: `DeliverableDto[]`

**GET** `/project/:projectId/deliverables/:deliverableId`

- Returns single deliverable
- Response: `DeliverableDto`

**POST** `/project/:projectId/deliverables`

- Creates new deliverable
- Body: `DeliverableBodyDto`
- Response: `DeliverableDto`

**POST** `/project/:projectId/deliverables/from-task/:taskId`

- Creates deliverable from task
- Body: `CreateDeliverableFromTaskDto`
- **Validation:** Task must have `projectStage` (cannot create from unplaced task)
- Response: `DeliverableDto`

**PATCH** `/project/:projectId/deliverables/:deliverableId`

- Updates deliverable
- Body: `DeliverableEditBodyDto` (all fields optional)
- Response: `DeliverableDto`

**DELETE** `/project/:projectId/deliverables/:deliverableId`

- Deletes deliverable
- Response: void

**GET** `/user/deliverables`

- Returns user's deliverables across all projects
- Optional query param: `projectId`
- Response: `DeliverableDto[]`

### Project Stages

**GET** `/project/:projectId`

- Returns project with `projectStages` array
- Stages are part of project configuration

**PATCH** `/project/:projectId`

- Updates project stages
- Body includes `projectStages` array
- Managed via `EditProjectStagesModal`

---

## Business Rules

### Task Rules

1. **Assignment:**

   - Must have at least one assignee
   - `inCharge` is required (primary responsible)
   - `assignees` array must include at least one user

2. **Stage Assignment:**

   - `projectStage` can be null (unplaced)
   - When moving between stages, order is recalculated
   - Unplaced tasks are only visible to owners

3. **Media Linking:**

   - Media linking is optional
   - Multiple media files can be linked
   - Media can be added/removed after creation

4. **Deliverable Creation:**

   - Can only create deliverable from placed task (has `projectStage`)
   - Unplaced tasks cannot be converted to deliverables
   - Task is automatically linked via `taskId` and `linkedTasks`

5. **Deletion:**
   - Deleting task removes it from all deliverables' `linkedTasks`
   - No cascade delete for deliverables

### Deliverable Rules

1. **Media Requirement:**

   - Must have at least one linked media file
   - Media cannot be removed if it's the only one

2. **Status:**

   - Status must exist in project's `deliverableStatuses`
   - Statuses are customizable per project
   - Statuses have order for sorting

3. **Task Linking:**

   - Can link multiple tasks
   - Only placed tasks can be linked (unplaced excluded)
   - When task is moved to unplaced, it's automatically removed from all deliverables

4. **Overdue Logic:**

   - Deliverable is overdue if `dueDate` < today
   - Exception: Status is "approved" or "published" (case-insensitive)
   - Overdue indicator shown in UI

5. **Task Conversion:**
   - When creating deliverable from task:
     - Task's name, inCharge, and media are pre-filled
     - Task is linked via both `taskId` and `linkedTasks`
     - Deliverable can be edited independently after creation

### Board Rules

1. **Visibility:**

   - Placed tasks: visible to all project members
   - Unplaced tasks: visible only to owner (inCharge or assignees)

2. **Drag & Drop:**

   - Can drag between columns (changes stage)
   - Can drag to "My Tasks" panel (sets stage to null)
   - Can reorder within same column (order update)
   - Activation distance: 5px to prevent accidental drags

3. **Stage Management:**

   - Stages are project-level configuration
   - Stages have order and color
   - Can add/edit/delete stages via modal
   - Deleting stage moves tasks to unplaced

4. **Task Removal from Deliverables:**
   - When task is moved to unplaced, system automatically:
     - Finds all deliverables with task in `linkedTasks`
     - Removes task ID from each deliverable's `linkedTasks`
     - Shows toast notification

---

## UI Components

### Board Components

**`Board.tsx`**

- Main board container
- Manages drag & drop context
- Handles task filtering
- Renders stage columns
- Manages "My Tasks" panel

**`BoardColumn.tsx`**

- Individual stage column
- Droppable zone for tasks
- Shows task count
- "Add Task" button (creates task with stage pre-selected)

**`TaskCard.tsx`**

- Individual task card
- Sortable/draggable
- Shows media preview, assignees, stage, deliverable badge
- Actions menu (edit, create deliverable, delete)

**`TasksPanel.tsx`**

- Side panel for "My Tasks"
- Shows unplaced and staged tasks assigned to user
- Droppable zone for moving tasks to unplaced
- Sections: "UNPLACED" and "IN PROGRESS"

### Deliverable Components

**`DeliverablesList.tsx`**

- Table view of deliverables
- Filtering by status
- Expandable rows for linked tasks
- Inline editing (status, due date)
- Actions (edit, delete)

**`DeliverableCard.tsx`**

- Card view of deliverable (used in card-based layouts)
- Sortable/draggable
- Media preview and management
- Task linking accordion
- Status and assignee management

**`CreateDeliverableModal.tsx`**

- Create/edit deliverable form
- Supports three modes:
  - Create new
  - Edit existing
  - Create from task
- Media and task pickers
- Validation and error handling

### Task Components

**`CreateTaskModal.tsx`**

- Create task form
- Stage selection (optional)
- Media linking (optional)
- Deliverable linking (optional)
- Auto-links to deliverable after creation if selected

**`EditTaskModal.tsx`**

- Edit task form
- All task fields editable
- "Move to Unplaced" button
- Deliverable management

**`TaskListItem.tsx`**

- List item view for tasks (used in panels)
- Shows task details compactly
- Actions menu
- Navigate to board on click

**`TaskPicker.tsx`**

- Modal/picker for selecting tasks
- Filters out unplaced tasks (if `excludeUnplaced` prop)
- Used when linking tasks to deliverables

**`TaskMediaPreview.tsx`**

- Shows thumbnails of linked media
- Configurable max visible count
- Size variants (sm, md, lg)

### Shared Components

**`AssetPicker.tsx`**

- Modal/picker for selecting assets/media
- Used in both task and deliverable creation
- Filters out already-selected assets

**`DeliverableMediaPreview.tsx`**

- Shows thumbnails of deliverable's linked media
- Similar to TaskMediaPreview

---

## Edge Cases & Special Behaviors

### Task Visibility

**Unplaced Task Visibility:**

- Only visible to users who are:
  - The task's `inCharge`
  - In the task's `assignees` array
- Not visible in board columns
- Only visible in "My Tasks" panel for owners

**Placed Task Visibility:**

- Visible to all project members
- Appears in board columns
- Appears in "My Tasks" if user is assignee

### Task-to-Deliverable Conversion

**Restrictions:**

- Can only create deliverable from placed task
- API validates: `task.projectStage` must not be null
- Error message: "Cannot create deliverable from unplaced task. Task must be assigned to a stage first."

**Automatic Linking:**

- Task is linked via both `taskId` (one-to-one) and `linkedTasks` (many-to-many)
- This allows tracking the original task while also supporting multiple task links

### Task Removal from Deliverables

**Automatic Cleanup:**

- When task is moved to unplaced:
  1. System finds all deliverables with task in `linkedTasks`
  2. Removes task ID from each deliverable's `linkedTasks` array
  3. Updates all affected deliverables via PATCH
  4. Shows toast: "Task moved to unplaced and removed from deliverables"

**Error Handling:**

- If deliverable update fails, task update still succeeds
- Error is logged but doesn't block task movement

### Order Management

**Automatic Ordering:**

- When task is created: order = highest order in stage + 1
- When task moves between stages:
  - Old stage: orders > task.order are decremented
  - New stage: task.order = highest order + 1

**Reorder Within Column:**

- Currently UI-only (client-side state)
- API endpoint exists (`/tasks/:taskId/reorder`) but not fully implemented
- TODO: Complete reorder API integration

### Deliverable Status Management

**Custom Statuses:**

- Each project has custom `deliverableStatuses` object
- Format: `{ [statusId]: { label, color, order } }`
- Editable via "Edit Statuses" modal
- Statuses sorted by order for display

**Overdue Calculation:**

- Checks if `dueDate` < current date
- Exception: Status label contains "approved" or "published" (case-insensitive)
- Overdue indicator shown with red color and "Overdue" chip

### Media Preview Logic

**Task Cards:**

- If media exists, shows large preview (aspect-video)
- First media shown as large preview
- Additional media shown as thumbnails (max 6 visible)

**Deliverable Cards:**

- Similar to task cards
- First media shown as large preview
- Remaining media shown as thumbnails (max 6 visible, skipping first)

**Media Loading:**

- Media IDs stored in `linkedMedia` array
- Assets loaded on-demand via `getAssetFileId()` API
- Loading states shown during fetch
- Error handling for failed asset loads

### Drag & Drop Behavior

**Activation:**

- Requires 5px movement to activate (prevents accidental drags)
- Uses `MouseSensor` and `TouchSensor` with distance constraint

**Drop Zones:**

- Stage columns: `column-{stageId}`
- My Tasks panel: `panel-unplaced`
- Other tasks: for reordering within column

**Visual Feedback:**

- Drag overlay shows task card being dragged
- Drop zones highlight when dragging over
- Opacity change on dragged item

**Optimistic Updates:**

- UI updates immediately on drop
- API call happens in background
- Error handling reverts UI if API fails

### Task Picker Filtering

**Exclude Unplaced:**

- `TaskPicker` component has `excludeUnplaced` prop
- When true, only shows tasks with `projectStage` set
- Used when linking tasks to deliverables
- Prevents linking unplaced tasks to deliverables

### Deliverable Task Linking

**Bidirectional Relationship:**

- Deliverable has `linkedTasks` array
- Task doesn't have reverse reference
- To find deliverable from task:
  - Query all deliverables
  - Check if task ID in `linkedTasks` or `taskId`

**Task Removal:**

- Can remove task from deliverable's `linkedTasks`
- No cascade delete
- Task remains in system

---

## Technical Implementation Notes

### State Management

**Local State:**

- Components use React `useState` for local UI state
- `useEffect` for data fetching and side effects
- Optimistic updates for better UX

**Context:**

- `ProjectContext` provides project data and members
- `FileContext` provides active file/asset data
- `SessionContext` provides current user

### API Integration

**HTTP Client:**

- Uses custom `Http` utility (`httpRequest.ts`)
- Handles authentication via JWT
- Error handling via `getErrorMessage()` utility

**Data Fetching:**

- `useCallback` for memoized fetch functions
- `useEffect` dependencies for refetch triggers
- Loading states for async operations

### Drag & Drop Library

**@dnd-kit:**

- Core library: `@dnd-kit/core`
- Sortable: `@dnd-kit/sortable`
- Utilities: `@dnd-kit/utilities`
- Sensors configured for mouse and touch
- Collision detection: `closestCorners`

### Error Handling

**User Feedback:**

- Toast notifications for success/error
- Error messages from API or generic fallback
- Loading spinners during async operations

**Error Recovery:**

- Optimistic updates with rollback on error
- Retry logic not implemented (future enhancement)
- Error logging to console for debugging

---

## Future Enhancements (Not Implemented)

1. **Task Reordering API:**

   - Complete implementation of `/tasks/:taskId/reorder` endpoint
   - Persist order changes to database

2. **Bulk Operations:**

   - Bulk task status updates
   - Bulk deliverable status updates
   - Multi-select for tasks/deliverables

3. **Notifications:**

   - Notify assignees on task assignment
   - Notify inCharge on deliverable status change
   - Overdue reminders

4. **Search & Filtering:**

   - Search tasks by name
   - Filter deliverables by date range
   - Advanced filters (assignee, status, date)

5. **Analytics:**

   - Task completion metrics
   - Deliverable status distribution
   - Time tracking (if added)

6. **Permissions:**
   - Role-based access control
   - Edit/delete permissions
   - Stage assignment permissions

---

## Appendix: Key Files Reference

### Frontend Components

- `/src/components/project/Board/Board.tsx`
- `/src/components/project/Board/BoardColumn.tsx`
- `/src/components/project/Board/TaskCard.tsx`
- `/src/components/project/Board/TasksPanel.tsx`
- `/src/components/project/Deliverables/DeliverableCard.tsx`
- `/src/components/project/Deliverables/DeliverablesList.tsx`
- `/src/components/project/Deliverables/CreateDeliverableModal.tsx`
- `/src/components/project/Tasks/CreateTaskModal.tsx`
- `/src/components/project/Tasks/EditTaskModal.tsx`
- `/src/components/project/Tasks/TaskListItem.tsx`

### Backend Services

- `/libs/task/src/task.service.ts`
- `/libs/task/src/task.schema.ts`
- `/libs/deliverable/src/deliverable.service.ts`
- `/libs/deliverable/src/deliverable.schema.ts`
- `/apps/review-tool/src/tasks/tasks.controller.ts`
- `/apps/review-tool/src/deliverables/deliverables.controller.ts`

### Type Definitions

- `/src/services/types.ts` (TaskDto, DeliverableDto, ProjectStageDto)

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Maintained By:** Development Team
