3. If module is called without arguments, notify user about wrong input and print a usagemessage (equal to calling with ​--help​​ option).
4. Appropriate action passed by ​--action​​ option should be called.
If action requiresadditional argument, it should be called with that argument provided with ​--file​​ option.
5.If ​streams.js​​ util does not contain an action passed or received argument is invalid,
appropriate error message should be shown to user.
Additionally, util may throw relevantexception
