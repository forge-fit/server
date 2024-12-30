module.exports = (plop) => {
  plop.setGenerator('module', {
    description: 'Generate a NestJS module with controller and service',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Module name:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{name}}/{{name}}.controller.ts',
        templateFile: 'plop-templates/controller.hbs',
      },
      {
        type: 'add',
        path: 'src/{{name}}/{{name}}.service.ts',
        templateFile: 'plop-templates/service.hbs',
      },
      {
        type: 'add',
        path: 'src/{{name}}/{{name}}.spec.ts',
        templateFile: 'plop-templates/spec.hbs',
      },
    ],
  });
};
