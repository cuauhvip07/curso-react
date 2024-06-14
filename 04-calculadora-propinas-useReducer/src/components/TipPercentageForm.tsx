
const tipOptions = [
    {
      id: 'tip-10',
      value: .10,
      label: '10%'
    },
    {
      id: 'tip-20',
      value: .20,
      label: '20%'
    },
    {
      id: 'tip-50',
      value: .50,
      label: '50%'
    },
]

type TipPercentageFormProps = {
    setTip: React.Dispatch<React.SetStateAction<number>>
    tip: number
}

export default function TipPercentageForm({setTip,tip}: TipPercentageFormProps) {
  return (
    <div>
        <h3 className=" font-black text-2xl">Propinas:</h3>
        <form action="">
            {tipOptions.map(tipOption => (
                <div className=" flex gap-2" key={tipOption.id}>
                    <label htmlFor={tipOption.id}>{tipOption.label}</label>
                    <input 
                        type="radio" 
                        id={tipOption.id}
                        name="tip"
                        value={tipOption.value}
                        onChange={ e => setTip(+e.target.value)}
                        checked={tipOption.value === tip}
                    />
                </div>
            ))}
            
        </form>
    </div>
  )
}
