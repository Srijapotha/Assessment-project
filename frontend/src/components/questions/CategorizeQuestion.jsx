import { Plus, X } from 'lucide-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function CategorizeQuestion({ question, onChange }) {
  const addCategory = () => {
    const newCategories = [...question.categories, `Category ${question.categories.length + 1}`]
    onChange({ ...question, categories: newCategories })
  }

  const addItem = () => {
    const newItems = [...question.items, {
      text: `Item ${question.items.length + 1}`,
      category: question.categories[0]
    }]
    onChange({ ...question, items: newItems })
  }

  const onDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(question.items)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onChange({ ...question, items })
  }

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">Categories</h3>
          <button
            onClick={addCategory}
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Category
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {question.categories.map((category, index) => (
            <div key={index} className="flex items-center bg-gray-100 rounded-md px-3 py-1">
              <input
                type="text"
                value={category}
                className="bg-transparent border-none focus:outline-none"
                onChange={e => {
                  const newCategories = [...question.categories]
                  newCategories[index] = e.target.value
                  onChange({ ...question, categories: newCategories })
                }}
              />
              <button
                onClick={() => {
                  const newCategories = question.categories.filter((_, i) => i !== index)
                  onChange({ ...question, categories: newCategories })
                }}
                className="ml-2 text-gray-500 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">Items</h3>
          <button
            onClick={addItem}
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Item
          </button>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="items">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {question.items.map((item, index) => (
                  <Draggable key={index} draggableId={`item-${index}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center gap-2 mb-2"
                      >
                        <input
                          type="text"
                          value={item.text}
                          className="flex-1 p-2 border border-gray-200 rounded focus:border-indigo-600 focus:outline-none"
                          onChange={e => {
                            const newItems = [...question.items]
                            newItems[index] = { ...item, text: e.target.value }
                            onChange({ ...question, items: newItems })
                          }}
                        />
                        <select
                          value={item.category}
                          className="p-2 border border-gray-200 rounded focus:border-indigo-600 focus:outline-none"
                          onChange={e => {
                            const newItems = [...question.items]
                            newItems[index] = { ...item, category: e.target.value }
                            onChange({ ...question, items: newItems })
                          }}
                        >
                          {question.categories.map((category, i) => (
                            <option key={i} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => {
                            const newItems = question.items.filter((_, i) => i !== index)
                            onChange({ ...question, items: newItems })
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}
export default CategorizeQuestion;