export default function beautifyError(err: any) {
    return (
        err.errors &&
        err.errors.map((m: any) => ({ message: m.message, value: m.value }))
    )
}
