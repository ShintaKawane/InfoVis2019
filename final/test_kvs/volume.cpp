#include <iostream>
#include <fstream>

#include <kvs/ValueArray>
#include <kvs/AnyValueArray>
#include <kvs/StructuredVolumeObject>
#include <kvs/ExternalFaces>
#include <kvs/RayCastingRenderer>
#include <kvs/Isosurface>
#include <kvs/OrthoSlice>

#include <kvs/glut/Application>
#include <kvs/glut/Screen>
int sx = 256;
int sy = 256;
int sz = 256;

int data_number = sx*sy*sz;

kvs::ValueArray<float> ReadFromFile(std::string fileName){
  kvs::ValueArray<float> data(data_number);
  std::ifstream in(fileName, std::ios::in | std::ios::binary);
  in.read((char*)&data[0], sizeof(uint8_t)*data_number);
  in.close();
  return data;
}

kvs::StructuredVolumeObject* CreateStructuredVolumeObject(kvs::ValueArray<float> values){
  kvs::StructuredVolumeObject* object = new kvs::StructuredVolumeObject();
  object->setGridType(kvs::StructuredVolumeObject::Uniform);
  object->setVeclen(1);
  object->setResolution(kvs::Vector3ui(sx,sy,sz));
  object->setValues(kvs::AnyValueArray(values));
  return object;
}

kvs::PolygonObject* make_OrthoSlicePolygon_ZAxis(kvs::StructuredVolumeObject* volume){
  const float p = volume->resolution().z() * 0.5f;
  const kvs::OrthoSlice::AlignedAxis a = kvs::OrthoSlice::XAxis;
  const kvs::TransferFunction t( 256 );
  return new kvs::OrthoSlice( volume, p, a, t );
}

int main(int argc, char** argv){

  kvs::glut::Application app(argc, argv);
  kvs::glut::Screen screen(&app);
  screen.setTitle("Volume");
  screen.setGeometry(0,0,500,500);
  screen.show();
  
  kvs::glsl::RayCastingRenderer* renderer = new kvs::glsl::RayCastingRenderer();
  renderer->enableShading();
  renderer->setSamplingStep(0.5f);
  renderer->setOpaqueValue(0.97f);
  kvs::TransferFunction transfer_function(256);
  renderer->setTransferFunction(transfer_function);
  kvs::StructuredVolumeObject *volume = CreateStructuredVolumeObject(ReadFromFile(argv[1]));
  //screen.registerObject(volume, renderer);
  screen.registerObject(make_OrthoSlicePolygon_ZAxis(volume));
  delete volume;
  
  return app.run();
}
