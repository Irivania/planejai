import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { simulationFormSteps, type SimulationFormData } from '@/data/simulation'
import { FormStep } from '@/components/features/Simulation/FormStep'

export function SimulationFormPage() {
  const navigate = useNavigate()
  const { saveFormData } = useSimulationStorage()

  const [formData, setFormData] = useState<Record<string, string>>({})
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const currentStep = simulationFormSteps[currentStepIndex]
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === simulationFormSteps.length - 1

  const currentValue = formData[currentStep.id] || ''
  const isValid = currentValue.trim().length > 0

  const handleValueChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [currentStep.id]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isValid) return

    if (isLastStep) {
      const newId = saveFormData(formData as SimulationFormData)
      navigate(`/resultado/${newId}`)
    } else {
      setCurrentStepIndex((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <FormStep
        {...currentStep}
        value={currentValue}
        onChange={handleValueChange}
        onSubmit={handleSubmit}
        onBack={handleBack}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        isValid={isValid}
      />
    </main>
  )
}

export default SimulationFormPage