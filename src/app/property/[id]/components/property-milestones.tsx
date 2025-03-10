"use client"

import { motion } from "framer-motion"

interface PropertyMilestonesProps {
  propertyId: string
}

// Dummy milestone data based on property ID
const getDummyMilestoneData = (id: string) => {
  const milestoneData = {
    "prop-001": [
      { name: "Milestone 1", condition: "10%", brokerage: "20%" },
      { name: "Milestone 2", condition: "10%", brokerage: "20%" },
      { name: "Milestone 3", condition: "10%", brokerage: "20%" },
    ],
    "prop-002": [
      { name: "Milestone 1", condition: "15%", brokerage: "25%" },
      { name: "Milestone 2", condition: "15%", brokerage: "25%" },
      { name: "Milestone 3", condition: "15%", brokerage: "25%" },
    ],
    "prop-003": [
      { name: "Milestone 1", condition: "12%", brokerage: "18%" },
      { name: "Milestone 2", condition: "12%", brokerage: "18%" },
      { name: "Milestone 3", condition: "12%", brokerage: "18%" },
    ],
  }

  // Return milestone data if it exists, otherwise return default data
  return (
    milestoneData[id as keyof typeof milestoneData] || [
      { name: "Milestone 1", condition: "10%", brokerage: "20%" },
      { name: "Milestone 2", condition: "10%", brokerage: "20%" },
      { name: "Milestone 3", condition: "10%", brokerage: "20%" },
    ]
  )
}

export default function PropertyMilestones({ propertyId }: PropertyMilestonesProps) {
  const milestoneData = getDummyMilestoneData(propertyId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="p-4 border-b"
    >
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Milestone</h3>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {milestoneData.map((milestone, index) => (
          <div key={index} className="border rounded-lg p-4 min-w-[160px]">
            <h4 className="font-semibold">{milestone.name}</h4>
            <div className="mt-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Condition</span>
                <span className="text-gray-500">Brokerage%</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-semibold">{milestone.condition}</span>
                <span className="font-semibold">{milestone.brokerage}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

