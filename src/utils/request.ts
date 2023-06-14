
export async function requestAdminUsers<T>(
    path = '',
    config: RequestInit = {}
): Promise<T> {
    const users = await fetch(`/api/admin/users${path}`, config).then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
    });
    return users as T;
}
