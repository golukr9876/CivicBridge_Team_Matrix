# Allowed Officials (CSV)

Only users listed in `allowed-officials.csv` can sign up with the **Official** role.

## Format

- First line must be the header: `email,username`
- Each following line: one email and one username, separated by a comma
- No spaces around commas; avoid commas inside email or username
- Matching is case-insensitive

## Example

```csv
email,username
official@civicbridge.gov,admin
officer@city.gov,john_doe
```

The **username** is the value the user enters in the "Username" field on the signup form (stored as their display name). Both email and username must match a row in this file for Official signup to succeed.

## Custom path

Set the env variable to use a different file:

```env
ALLOWED_OFFICIALS_CSV=/absolute/path/to/your-officials.csv
```
